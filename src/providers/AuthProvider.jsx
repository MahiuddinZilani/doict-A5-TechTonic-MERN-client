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
// import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

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
      const response = await fetch(
        "https://a5-tech-tonic-mern-server.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: newUser.uid,
            email: newUser.email,
            displayName: name || "User",
            phone: phone,
            photoURL: photo,
            address: address,
            createdAt: new Date(),
            isAdmin: false, // Default role
            isBlocked: false, // Default status
            isSuper: false,
          }),
        }
      );

      const data = await response.json();
      if (response.ok && data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User is created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error(data.message || "Failed to save user data in database");
      }

      await logout();
      return true;
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //   Log in with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const loginWithGoogle = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        const newUser = res.user;

        // Check if user already exists in the database
        const response = await fetch(
          `https://a5-tech-tonic-mern-server.vercel.app/users/${newUser.email}`
        );
        const existingUser = await response.json();

        // If user does not exist, insert new user data
        if (!existingUser) {
          const userForDB = {
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            photoURL: newUser.photoURL,
            createdAt: new Date(),
            isAdmin: false,
            isBlocked: false,
            isSuper: false,
          };

          const insertResponse = await fetch(
            "https://a5-tech-tonic-mern-server.vercel.app/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userForDB),
            }
          );
          const insertData = await insertResponse.json();
          setUser(userForDB); // Update the user state after successful insert
          console.log("User saved in database:", insertData);
        } else {
          setUser(existingUser); // Use existing user from database
        }

        // Show success message and navigate
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        return true;
      })
      .catch((error) => console.error("Google Sign-In Error:", error))
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
            `https://a5-tech-tonic-mern-server.vercel.app/users/${currentUser.email}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch user data.");
          }

          const data = await res.json();
          // console.log(data, currentUser);
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
