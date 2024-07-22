// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ4gH8yK7c55h4iwxp2wUSVUR8Oc29kN4",
  authDomain: "revtech-garage.firebaseapp.com",
  projectId: "revtech-garage",
  storageBucket: "revtech-garage.appspot.com",
  messagingSenderId: "1025647207298",
  appId: "1:1025647207298:web:fe99214479fe14b761a59b",
  measurementId: "G-F1K37FG8EF"
};

function showMessage(message, divID, color) {
    const div = document.getElementById(divID);
    div.style.display = 'block';
    div.style.backgroundColor = color;
    div.innerHTML = message;
    div.style.opacity = 1;
    setTimeout(function () {
        div.style.opacity = 0;
    }, 5000);
}


const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const verifyPassword = document.getElementById('verify-password').value;

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

        // Basic email format validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'signUpMessage', 'red');
            return;
        }
    
        // Password length validation
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'signUpMessage', 'red');
            return;
        }

        if(password != verifyPassword){
            showMessage('Passwords do not match!!', 'signUpMessage','red');
            return;
        }
    
        // First name and last name validation (can add more specific checks if needed)
        if (firstName.trim() === '' || lastName.trim() === '') {
            showMessage('Please enter your first and last name', 'signUpMessage', 'red');
            return;
        }

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
        const user = userCredential.user;
        const userData ={
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Account created successfully', 'signUpMessage', 'green');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href='index.html';
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if(errorCode == 'auth/email-already-in-use'){
            showMessage('Email Address Already Exists!!', 'signUpMessage', 'red');
        }
        else{
            showMessage('Unable to create user!!', 'signUpMessage', 'red');
            
        }
    });
})

// Function to validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);