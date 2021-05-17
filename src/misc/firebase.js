import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBf4WdbsKOUvn_wrQs9eZ1HlfLx9qyH1Kw',
  authDomain: 'batiyalo-e6931.firebaseapp.com',
  projectId: 'batiyalo-e6931',
  storageBucket: 'batiyalo-e6931.appspot.com',
  messagingSenderId: '502599654045',
  appId: '1:502599654045:web:371daafb400a01ecd09274',
};
const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database;
