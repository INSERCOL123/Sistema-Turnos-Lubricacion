import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_M0TkSeJc_MUleIBK1b2Y9dq1puf-8Ww",
  authDomain: "turnos-lubricacion-6998a.firebaseapp.com",
  projectId: "turnos-lubricacion-6998a",
  storageBucket: "turnos-lubricacion-6998a.appspot.com",
  messagingSenderId: "21521100171",
  appId: "1:21521100171:web:b84b49500bc9c3ed81138e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
