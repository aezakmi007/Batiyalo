import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { Notification as Toast } from 'rsuite';
import { isLocalhost } from './Helper';

const config = {
  apiKey: 'AIzaSyBf4WdbsKOUvn_wrQs9eZ1HlfLx9qyH1Kw',
  authDomain: 'batiyalo-e6931.firebaseapp.com',
  projectId: 'batiyalo-e6931',
  storageBucket: 'batiyalo-e6931.appspot.com',
  messagingSenderId: '502599654045',
  appId: '1:502599654045:web:371daafb400a01ecd09274',
};
export const fcmVapidKey =
  'BOYGpSoKmh5rjDfKy-a3AwzceaiIdOvxtss4pMi7XEYluWIGC170ZYnpvtZ-HyuskH_2_AZbem1fEvsE2Zhx7EE';
const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('europe-west3');

export const messaging = firebase.messaging.isSupported
  ? app.messaging()
  : null;

if (messaging) {
  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
  //
}

if (isLocalhost) {
  functions.useEmulator('localhost', 5001);
}
