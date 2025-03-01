const firebaseConfig = {
  apiKey: "AIzaSyDB7ISeqMg9amQMqSC-RmVKVh8F6CV1vT8",
  authDomain: "url-shortner-9afc0.firebaseapp.com",
  projectId: "url-shortner-9afc0",
  storageBucket: "url-shortner-9afc0.firebasestorage.app",
  messagingSenderId: "29716485939",
  appId: "1:29716485939:web:947b3b4a9b7f0c79189046"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function redirect() {
    const shortCode = window.location.pathname.substring(1); // Get the short URL code
    if (shortCode) {
        const doc = await db.collection("shortUrls").doc(shortCode).get();
        if (doc.exists) {
            const data = doc.data();
            await db.collection("shortUrls").doc(shortCode).update({
                clicks: data.clicks + 1
            });
            window.location.replace(data.longURL);
        } else {
            document.body.innerHTML = "<h1>404: Not Found</h1>";
        }
    }
}
redirect();
