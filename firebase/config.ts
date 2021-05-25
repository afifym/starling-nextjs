import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/performance';

const firebaseConfig = {
  apiKey: 'AIzaSyA2WWgYSMvZREtJFqGYNPv2veNeUnkUYac',
  authDomain: 'starling-b131b.firebaseapp.com',
  databaseURL: 'https://starling-b131b-default-rtdb.firebaseio.com',
  projectId: 'starling-b131b',
  storageBucket: 'starling-b131b.appspot.com',
  messagingSenderId: '338454980374',
  appId: '1:338454980374:web:1cbceea25301ffed3dd237',
  measurementId: 'G-PC46D6NX90',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

if (typeof window != undefined) {
}
export const analytics = firebase.analytics;

export const perf = firebase.performance;

// const perf = firebase.performance();

export default firebase;

// https://starling-b131b-default-rtdb.firebaseio.com/
