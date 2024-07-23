import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZ4gH8yK7c55h4iwxp2wUSVUR8Oc29kN4",
  authDomain: "revtech-garage.firebaseapp.com",
  projectId: "revtech-garage",
  storageBucket: "revtech-garage.appspot.com",
  messagingSenderId: "1025647207298",
  appId: "1:1025647207298:web:fe99214479fe14b761a59b",
  measurementId: "G-F1K37FG8EF",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();


document.addEventListener("DOMContentLoaded", function () {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("first-name").innerText = "First Name: "+userData.firstName;
          document.getElementById("last-name").innerText = "Last Name: "+userData.lastName;
          document.getElementById("email").innerText = "Email: "+userData.email;
        }
      })
      .catch((error) => {
        console.error("Error getting document: ", error);
      });
  } else {
    console.log("User id not found in local storage");
  }
});