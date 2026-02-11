import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxios();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Register
  const registerUser = async (email, password, name, photoURL) => {
    setLoading(true);

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL,
    });

    return result;
  };

  // 🔹 Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔹 Logout
  const logoutUser = async () => {
    localStorage.removeItem("access-token");
    setUser(null);
    return signOut(auth);
  };

  // 🔹 Observe Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      setUser(currentUser);

      if (currentUser) {
        try {
          //  Get Firebase Token
          const token = await currentUser.getIdToken();
          localStorage.setItem("access-token", token);

          //  Save user to backend with token
          await axiosPublic.post(
            "/users",
            {
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

        } catch (error) {
          console.error(
            "User save failed:",
            error.response?.data || error.message
          );
        }
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
