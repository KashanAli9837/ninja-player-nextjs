import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCsvS5NG_QSj9Usptsp_A2Ir8MGzqeESOM",
  authDomain: "project-nextauth-demo.firebaseapp.com",
  projectId: "project-nextauth-demo",
  storageBucket: "project-nextauth-demo.firebasestorage.app",
  messagingSenderId: "433389832091",
  appId: "1:433389832091:web:19da2f041d97028992433e",
  measurementId: "G-DNRQXRL308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;