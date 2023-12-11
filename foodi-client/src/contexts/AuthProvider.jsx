import React, { createContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase.config"
import axios from "axios"

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create an account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signup with gmail
    const signupWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // login using gmail & password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logout = () => {
        return signOut(auth)
    }

    // update profile
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }

    // check signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log(currentUser);
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axios.post('http://localhost:6001/jwt', userInfo).then((response) => {
                    if (response.data.token) {
                        localStorage.setItem('access-token', response.data.token);
                    }
                })
            } else {
                localStorage.removeItem('access-token');
            }

            setLoading(false);
        });

        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        signupWithGmail,
        login,
        logout,
        updateUserProfile,
        loading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider