import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { doc, getFirestore, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

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

const signInButton = document.getElementById('signin-btn');
signInButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if(loggedInUserId)
  {
    showMessage('Login successful!!', 'signInMessage', 'green');
    window.location.href = 'index.html'; // Redirect after successful login
  }
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);

    // Retrieve user data from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      localStorage.setItem('loggedInUserFirstName', userData.firstName);
      localStorage.setItem('loggedInUserLastName', userData.lastName);
      localStorage.setItem('loggedInUserId', user.uid);
      console.log("User data retrieved:", userData);
    } else {
      console.error("User document not found in Firestore");
    }

    showMessage('Login successful!!', 'signInMessage', 'green');
    console.log("User logged in");
    window.location.href = 'index.html'; // Redirect after successful login
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-disabled') {
      showMessage('Incorrect email or password!!', 'signInMessage', 'red');
    } else if (errorCode === 'auth/wrong-password') {
      showMessage('Incorrect Password!!', 'signInMessage', 'red');
    } else {
      showMessage('Error signing in. Please try again later.', 'signInMessage', 'red');
      console.error('Error signing in:', error);
    }
  }
});