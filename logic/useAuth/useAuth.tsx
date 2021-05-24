import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/auth';

interface IAuthContext {
  currentUser: any;
  login: any;
  signup: any;
  logout: any;
  addImage: (imgURL: string) => void;
  addDisplayName: (displayName: string) => void;
}

const AuthContext = React.createContext<IAuthContext>(
  undefined as IAuthContext
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const addImage = (photoURL: string) => {
    auth.currentUser.updateProfile({ photoURL });
  };
  const addDisplayName = (displayName: string) => {
    auth.currentUser.updateProfile({ displayName });
  };
  // const googleLogin = ()=>{
  //   const provider = auth.GoogleProvider();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    addImage,
    addDisplayName,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
