import { ITag, ITodosState } from '../config/interfaces';
import firebase from './config';
import 'firebase/firestore';

const db = firebase.firestore();

export const getUserData = async (uid: string) => {
  const ref = await db.collection('users').doc(uid);
  const getRef = await ref.get();

  if (!getRef.exists) {
    ref.set(
      {
        todos: {
          '0': [],
          '1': [],
          '2': [],
          '3': [],
          '4': [],
          '5': [],
        },
        tags: [],
        followPrayers: false,
      },
      { merge: true }
    );
  }
  const data = await (await ref.get()).data();
  return data;
};

export const updateTodos = async (uid: string, todos: ITodosState) => {
  await db.collection('users').doc(uid).update({ todos });
};

export const updateTags = async (uid: string, tags: ITag[]) => {
  await db.collection('users').doc(uid).update({ tags });
};

export const updatePhaseType = async (uid: string, type: boolean) => {
  await db.collection('users').doc(uid).update({ followPrayers: type });
};

export const playWithFirestore = async () => {
  const snapshot = await db.collection('users').get();
  const docs = snapshot.docs;
  const data = docs.map((doc) => doc.data());
  console.log('OUTPUT: ', data);
};
