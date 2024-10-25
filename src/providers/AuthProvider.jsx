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

  const createUser = async (email, password, name, photo, phone, address) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Update profile with name and photo
      await userUpdateProfile(name, photo);

      // Save user data in MongoDB
      const response = await fetch("http://localhost:5100/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: newUser.uid,
          email: newUser.email,
          displayName: name || "User",
          phone: phone,
          photoUrl: photo,
          address: address,
          isAdmin: false, // Default role
          isBlocked: false, // Default status
          isSuper: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user data.");
      }

      setUser(newUser); // Update state
      return newUser;
    } catch (error) {
      console.error(error);
      throw error; // Make sure to throw so the error can be caught by the caller
    } finally {
      setLoading(false); // Always set loading to false when done
    }
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
    return signOut(auth);
  };

  const userUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Start loading when auth state changes
      if (currentUser) {
        try {
          const res = await fetch(
            `http://localhost:5100/users/${currentUser.email}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch user data.");
          }

          const data = await res.json();
          console.log(data, currentUser);
          setUser(data); // Set user state with the MongoDB user data
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        } finally {
          setLoading(false); // Stop loading once fetch is done
        }
      } else {
        setUser(null);
        setLoading(false); // Stop loading if there's no current user
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
