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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("loggedInUserFirstName");
    localStorage.removeItem("loggedInUserLastName");
  }
  console.log('Test successful');
  const loggedInUserFirstName = localStorage.getItem("loggedInUserFirstName");
  const loggedInUserLastName = localStorage.getItem("loggedInUserLastName");
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserFirstName) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("User data: " + userData);
          toggleLoginState(true);
          document.getElementById("user-name").innerText = "Hello, " + userData.firstName;
        }
      })
      .catch((error) => {
        console.error("Error getting document: ", error);
      });
  } else {
    console.log("User id not found in local storage");
  }
});

function toggleLoginState(loggedIn) {
  const notLoggedInElements = document.querySelectorAll("#not-loggedin, #signup");
  const loggedInElements = document.querySelectorAll("#loggedin, #logout");

  if (loggedIn) {
    notLoggedInElements.forEach((elem) => (elem.style.display = "none"));
    loggedInElements.forEach((elem) => (elem.style.display = "flex"));
  } else {
    notLoggedInElements.forEach((elem) => (elem.style.display = "block"));
    loggedInElements.forEach((elem) => (elem.style.display = "none"));
  }
}

const logoutButton = document.querySelector("#logout");
if (logoutButton) {
  logoutButton.addEventListener("click", (event) => {
    console.log("Logout clicked");
    event.preventDefault();
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("loggedInUserFirstName");
    localStorage.removeItem("loggedInUserLastName");
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
} else {
  console.log("Logout button not found");
}
