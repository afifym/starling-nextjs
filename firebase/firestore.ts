// import { ITodo } from '../config/interfaces';
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

  const ref = await db.collection('users').doc(uid).get();

  //   ref.get().then((snapshot: any) => console.log('snap: ', snapshot.docs));
  //   const setted = ref.set({ todos: [], tags: [] }, { merge: true });

  //   const s = ref
  //     .set({ todos: [], tags: [] }, { merge: true })
  //     .then((d) => console.log('d: ', d));

  //   console.log('S: ', s);
  return ref.data();
};
