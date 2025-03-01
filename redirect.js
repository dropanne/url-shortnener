import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyDB7ISeqMg9amQMqSC-RmVKVh8F6CV1vT8",
  authDomain: "url-shortner-9afc0.firebaseapp.com",
  projectId: "url-shortner-9afc0",
  storageBucket: "url-shortner-9afc0.firebasestorage.app",
  messagingSenderId: "29716485939",
  appId: "1:29716485939:web:947b3b4a9b7f0c79189046"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Extract the shortCode from the URL
const shortCode = window.location.pathname.substring(1);

if (shortCode) {
    const docRef = doc(db, "shortUrls", shortCode);
    getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                updateDoc(docRef, { clicks: data.clicks + 1 });
                window.location.replace(data.longURL);
            } else {
                document.body.innerHTML = "<h1>404: Not Found</h1>";
            }
        })
        .catch((error) => {
            console.error("Error fetching document: ", error);
            document.body.innerHTML = "<h1>Something went wrong!</h1>";
        });
}
