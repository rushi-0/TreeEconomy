import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = user.uid;
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                } else {
                    console.log("No document found matching ID");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    } else {
        console.log("User not signed in");
        window.location.href = '../../../index.html';
    }
});

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = '../../../index.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});
