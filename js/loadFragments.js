import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

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

function loadFragment(id, url, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // Call the callback function after loading fragment
    })
    .catch((error) => console.error("Error loading fragment:", error, id));
}

document.addEventListener("DOMContentLoaded", function () {
  loadFragment("header", "fragments/header.html");
  loadFragment("nav", "fragments/nav.html", function () {
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
      logoutButton.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("loggedInUserId");
        localStorage.removeItem("loggedInUserFirstName");
        localStorage.removeItem("loggedInUserLastName");
        signOut(auth)
          .then(() => {
            console.log("User signed out");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      });
    } else {
      console.error("Logout button not found");
    }
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    if (burger) {
      burger.addEventListener("click", () => {
        nav.classList.toggle("open");

        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
          }
        });

        burger.classList.toggle("toggle");
      });
    } else {
      console.error("Burger button not found");
    }
  });
  loadFragment("footer", "fragments/footer.html");
});
