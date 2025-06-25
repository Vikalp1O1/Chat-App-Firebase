import React, { useEffect, useState } from 'react'
import { AuthContext } from './authContext';
import {createUserWithEmailAndPassword ,GoogleAuthProvider,onAuthStateChanged,signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth';
import {auth , db} from '../firebase/firebase'
import { collection,addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function AuthProvider({children}) {

    const googleProvider = new GoogleAuthProvider();
    const [user,setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getUserToken = localStorage.getItem('userToken');
    console.log('getUserToken from AuthProvider', getUserToken);
    
    
     useEffect(() => {
        setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
             
      setUser(firebaseUser); 
      setIsLoggedIn(!!firebaseUser);

        if(firebaseUser){
            // console.log('user in auth state change', firebaseUser);
            const storedUser = localStorage.setItem('userToken',firebaseUser.accessToken);
        const getStoredUser = localStorage.getItem('userToken');
        console.log('getStoredUser from re render', getStoredUser);
    
        }
        else{

            localStorage.removeItem('userToken');
        }

        setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

    const signUp =  ({name,email,password}) => {
        console.log({name,email,password}, "userData in signup");

        createUserWithEmailAndPassword(auth,email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user after sign in using auth id',user.uid);
                const userId = user.uid;

                try {
                    const docRef = await addDoc(collection(db,'users'),{
                        name:name,
                        userId:userId,
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                } 

                setUser(user);
                setIsLoggedIn(true);
                const storedUser = localStorage.setItem('userToken', user.accessToken);
                toast.success('User created successfully and logged in');
                
                navigate('/');
                console.log("User logged in:", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLoggedIn(false);
                setUser(null);
                // console.log('Error Code= ', error.code);
                if (errorCode === 'auth/email-already-in-use') {
                    toast.error('User already exists , Try Login ');
                    // console.error("Email already in use. Please use a different email.");
                }
                console.error("Error logging in:", errorCode, errorMessage);
            });
    };
    const login = async ({email,password})=>{

        try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            console.log("User logged in:", user);
             setUser(user);
           setIsLoggedIn(true);
            toast.success('User logged in successfully');
            
            
            const userToken = user.accessToken;
            console.log('user after login token',userToken);
             const storedUser = localStorage.setItem('userToken',userToken);
             const getStoredData = localStorage.getItem('userToken');
            console.log('getStoredData', getStoredData);
                // console.log('storedUser', storedUser);
            navigate('/');
            
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === 'auth/invalid-credential'){
                toast.error('Invalid credentials, try again or sign up');
            }
            console.error("Error while logging in:", errorCode, errorMessage);
        }
    };

    const signInWithGoogle =()=>{
        signInWithPopup(auth,googleProvider)
        .then((result)=>{
            // it will give us a google access token , we can use it to use google Api
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const storedUser = localStorage.setItem('userToken',token);
            // user information that is signed in
            const user = result.user;
            setUser(user);
            setIsLoggedIn(true);
            toast.success('User logged in with Google successfully');

        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("Error while signing in with Google:", errorCode, errorMessage, credential);
           

            
        })
    };


    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('userToken');
        toast.success('User logged out successfully');
        auth.signOut();
    };

    console.log('user log in nh bgrtkmefmdiub',isLoggedIn);
    
  return (
    <AuthContext.Provider value={{user,setUser,signUp,login,logout,isLoggedIn,setIsLoggedIn,signInWithGoogle,isLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider