

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCupCFTEJlkTC7gs2p3NzVuktIvDz9WuhQ",
  authDomain: "chatapp-3817a.firebaseapp.com",
  projectId: "chatapp-3817a",
  storageBucket: "chatapp-3817a.appspot.com",
  messagingSenderId: "762906787808",
  appId: "1:762906787808:web:5804298081be76bf15b585"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

// The reason the db is not working is because the getFirestore function is not a default export from the firebase/firestore module.
