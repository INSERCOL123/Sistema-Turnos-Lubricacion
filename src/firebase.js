$ npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_M0TkSeJc_MUleIBK1b2Y9dq1puf-8Ww",
  authDomain: "turnos-lubricacion-6998a.firebaseapp.com",
  projectId: "turnos-lubricacion-6998a",
  storageBucket: "turnos-lubricacion-6998a.firebasestorage.app",
  messagingSenderId: "21521100171",
  appId: "1:21521100171:web:b84b49500bc9c3ed81138e"
};
const app = initializeApp(firebaseconfig);
expor const = getFirestore(app);