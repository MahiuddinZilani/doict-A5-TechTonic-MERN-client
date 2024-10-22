import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("from onAuthStateChanged: ", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //   Create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Log in with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  // Login with Google
  const loginWithGoogle = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
      .then((res) => {
        const newUser = res.user;
        setUser(newUser);

        const userForDB = {
          // uid: newUser.uid,
          email: newUser.email,
          displayName: newUser.displayName,
          photoURL: newUser.photoURL,
          createdAt: new Date(),
        };

        fetch("http://localhost:5100/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userForDB), // Pass the correct user data
        })
          .then((res) => res.json()) // Parse the response
          .then((data) => {
            console.log("User saved in database:", data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login Successful!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => console.error(error));

        if (user) {
          return (
            <>
              <Navigate to={"/"}></Navigate>
            </>
          );
        }
      })
      .finally(() => setLoading(false));
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  const userUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    userUpdateProfile,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
