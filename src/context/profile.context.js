import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth, database, messaging, fcmVapidKey } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let useRef;
    let userStatusRef;

    const authUnsub = auth.onAuthStateChanged(async authObj => {
      if (authObj) {
        console.log(authObj.uid);
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        useRef = database.ref(`/profiles/${authObj.uid}`);
        useRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          // If we're not currently connected, don't do anything.
          if (!!snapshot.val() === false) {
            return;
          }

          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });

        if (messaging) {
          try {
            // const currentToken = await messaging.getToken();
            const currentToken = await messaging.getToken({
              vapidKey: fcmVapidKey,
            });
            if (currentToken) {
              await database
                .ref(`/fcm_tokens/${currentToken}`)
                .set(authObj.uid);
            }
          } catch (err) {
            console.log('An error occurred while retrieving token. ', err);
            // ...
          }
        }
      } else {
        if (useRef) {
          useRef.off();
        }

        if (userStatusRef) {
          userStatusRef.off();
        }

        database.ref('.info/connected').off();
        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsub();
      database.ref('.info/connected');

      if (useRef) {
        useRef.off();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

const useProfile = () => useContext(ProfileContext);
export default useProfile;
