import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAzoOxlkPCJKhUstHZCmH1KRL1PmQJOoOg",
  authDomain: "peoplecounteredp.firebaseapp.com",
  projectId: "peoplecounteredp",
  storageBucket: "peoplecounteredp.appspot.com",
  messagingSenderId: "882305515879",
  appId: "1:882305515879:web:70c01fec5137a5bf00efc2",
  databaseURL:
    "https://peoplecounteredp-default-rtdb.asia-southeast1.firebasedatabase.app"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
 