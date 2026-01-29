// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpCF-1t_4P5PhcEIt8pSsVvcWrsAphC18",
    authDomain: "treeeconomy-868.firebaseapp.com",
    projectId: "treeeconomy-868",
    storageBucket: "treeeconomy-868.appspot.com",
    messagingSenderId: "652307912867",
    appId: "1:652307912867:web:3116c1af1603e6b3bc8716"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('plantationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const occasion = form.occasion.value;
    const name = form.name.value;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log('User is signed in:', user.uid);
            const userId = user.uid;
            const userDoc = doc(db, "users", userId);
            try {
                await setDoc(userDoc, {
                    occasion: occasion,
                    name: name
                });
                console.log('Document successfully written!');

                // Redirect to next page with URL parameters
                window.location.href = `nextPage.html?occasion=${encodeURIComponent(occasion)}&name=${encodeURIComponent(name)}`;
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('Error submitting form!');
            }
        } else {
            console.log('No user is signed in');
            alert('You need to be logged in to submit the form');
        }
    });
});
