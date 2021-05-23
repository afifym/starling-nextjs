import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA2WWgYSMvZREtJFqGYNPv2veNeUnkUYac',
  authDomain: 'starling-b131b.firebaseapp.com',
  databaseURL: 'https://starling-b131b-default-rtdb.firebaseio.com',
  projectId: 'starling-b131b',
  storageBucket: 'starling-b131b.appspot.com',
  messagingSenderId: '338454980374',
  appId: '1:338454980374:web:1cbceea25301ffed3dd237',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// const perf = firebase.performance();

export default firebase;

// https://starling-b131b-default-rtdb.firebaseio.com/
