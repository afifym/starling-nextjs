// import { ITodo } from '../config/interfaces';
import { ITag, ITodosState } from '../config/interfaces';
import firebase from './config';

const db = firebase.firestore();

// const getTodos = async (uid: string) => {
//   const data: any = await db
//     .collection('users')
//     .doc(uid)
//     .collection('todos')
//     .get();
//   const todos = data.docs.map((doc) => doc.data());

//   console.log('fetch: ', todos);
//   return todos;
// };

// const updateTodoTitle = async (todo: ITodo, title: string) => {
//   db.collection('spells')
//     .doc(todo.id)
//     .set({ ...todo, title });
// };

// }
export const getUserData = async (uid) => {
  //   const userRef = db.doc(`users/${user.uid}`);

  const ref = await db.collection('users').doc(uid);
  const refGet = await ref.get();

  if (!refGet.exists) {
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
      },
      { merge: true }
    );
  }

  const data = await (await ref.get()).data();

  //   ref.get().then((snapshot: any) => console.log('snap: ', snapshot.docs));
  //   const setted = ref.set({ todos: [], tags: [] }, { merge: true });

  //   const s = ref
  //     .set({ todos: [], tags: [] }, { merge: true })
  //     .then((d) => console.log('d: ', d));

  //   console.log('S: ', s);
  // return ref.data();
  return data;
};

export const updateTodos = async (uid: string, todos: ITodosState) => {
  const ref = await db.collection('users').doc(uid).update({ todos: todos });
  console.log('UPDATE');
};

export const updateTags = async (uid: string, tags: ITag[]) => {
  const ref = await db.collection('users').doc(uid).update({ tags: tags });
  console.log('UPDATE');
};
