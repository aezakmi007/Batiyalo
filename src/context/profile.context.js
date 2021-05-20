import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let useRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
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
      } else {
        if (useRef) {
          useRef.off();
        }
        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsub();

      if (useRef) {
        useRef.off();
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
