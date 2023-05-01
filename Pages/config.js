import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
var firebaseConfig = {
    apiKey: "AIzaSyA8DMBhmvKkh2kMz6ZgdMQtnMvSvRdwivw",
    authDomain: "smartcontaineredp.firebaseapp.com",
    projectId: "smartcontaineredp",
    storageBucket: "smartcontaineredp.appspot.com",
    messagingSenderId: "47402132400",
    appId: "1:47402132400:web:700f652c6c02dd7e9fec75",
    measurementId: "G-W00JTMKSTP",
    databaseURL: "https://smartcontaineredp-default-rtdb.asia-southeast1.firebasedatabase.app",
  };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
