import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_SFLp6Awl6y6G8vWcIsUyGoVVHaDKwZk",
  authDomain: "mobile-legends-d77ed.firebaseapp.com",
  projectId: "mobile-legends-d77ed",
  storageBucket: "mobile-legends-d77ed.appspot.com",
  messagingSenderId: "553450372187",
  appId: "1:553450372187:web:d6accf4ab08fa0d135d37e",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
