import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

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
const resetbtn = document.getElementById("resetpass-btn");

function showMessage(message, divID, color) {
  const div = document.getElementById(divID);
  div.style.display = "block";
  div.style.backgroundColor = color;
  div.innerHTML = message;
  div.style.opacity = 1;
  setTimeout(function () {
    div.style.opacity = 0;
  }, 5000);
}

resetbtn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("signin-email").value;
  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address", "resetPasswordMsg", "red");
    return;
  }
  sendPasswordResetEmail(auth, email)
    .then(() => {
      showMessage("Email with password reset instructions sent.", "resetPasswordMsg", "green");
    })
    .catch((error) => {
      showMessage("Something went wrong. Please try again later.", "resetPasswordMsg", "red");
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

