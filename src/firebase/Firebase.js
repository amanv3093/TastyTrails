import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCFkYh7EL6k6NEaI2Jt9RWOedsI-n2MjVg",
  authDomain: "tastytrails-ee299.firebaseapp.com",
  projectId: "tastytrails-ee299",
  storageBucket: "tastytrails-ee299.appspot.com",
  messagingSenderId: "41054393520",
  appId: "1:41054393520:web:1933052070ee2663031775",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
