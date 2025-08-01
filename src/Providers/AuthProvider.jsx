// import { createContext, useEffect, useState } from "react";
// import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


// import app from "../firebase/firebase.config";
// import useAxiosPublic from "../Hooks/useAxiosPublic";

// export const AuthContext = createContext(null);
// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const googleProvider = new GoogleAuthProvider();
//   const axiosPublic = useAxiosPublic();

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const login = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const googleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const logOut = async () => {
//     try {
//       setLoading(true);
//       localStorage.removeItem('access_token'); // Clear token
//       setUser(null);  // Clear user data in context
//       await signOut(auth);  // Firebase sign-out
//       window.location.href = '/login';  // Redirect to login page
//     } catch (error) {
//       console.error('Error during logout:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     });
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const userInfo = {
//           email: currentUser.email,
//         };
//         try {
//           // Get token and store it in local storage
//           const response = await axiosPublic.post('/jwt', userInfo);
//           if (response.data.token) {
//             localStorage.setItem('access_token', response.data.token);
//           }
//         } catch (error) {
//           console.error('Error fetching JWT token:', error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         // Remove token
//         localStorage.removeItem('access_token');
//         setLoading(false);
//       }
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, [axiosPublic]);

//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     login,
//     logOut,
//     updateUserProfile,
//     googleSignIn,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  // Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('access_token');
      setUser(null);
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser?.email) {
        const userInfo = { email: currentUser.email };
        try {
          const response = await axiosPublic.post("/jwt", userInfo);
          if (response?.data?.token) {
            localStorage.setItem("access_token", response.data.token);
          } else {
            console.warn("No token received from server.");
            localStorage.removeItem("access_token");
          }
        } catch (err) {
          console.error("JWT fetch error:", err.message);
          localStorage.removeItem("access_token");
        }
      } else {
        localStorage.removeItem("access_token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    updateUserProfile,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
