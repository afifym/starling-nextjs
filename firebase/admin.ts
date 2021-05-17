import admin from 'firebase-admin';

const serviceAccount = require('./starling-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://starling-b131b-default-rtdb.firebaseio.com',
});
