import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA6ATH0OWugXDyKtonguSo_W0Ks0pT9RsU",
    authDomain: "ecta-ms-3f067.firebaseapp.com",
    databaseURL: "https://ecta-ms-3f067-default-rtdb.firebaseio.com",
    projectId: "ecta-ms-3f067",
    storageBucket: "ecta-ms-3f067.appspot.com",
    messagingSenderId: "786710646995",
    appId: "1:786710646995:web:deed2bd23aca690ea00426"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Function to show messages in the UI
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Event listener for sign-up form submission
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('eEmail').value;
    const username = document.getElementById('uUsername').value;
    const password = document.getElementById('pPassword').value;

    const auth = getAuth();
    const db = getFirestore();

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Save user data to Firestore
            const userData = {
                email: email,
                username: username
            };
            showMessage('Account created successfully!', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
            .then(()=>{
                window.location.href = 'signin.html';
            })
            .catch((error)=>{
                console.error("error writing document", error)
            });
        })
        .catch((error)=>{
            const errorCode = error.code;
            if(errorCode == 'auth/email-already-in-use'){
                showMessage('Email taken', 'signUpMessage');
            }
            else{
                showMessage('unable to create', 'signUpMessage')
            }
        })
});

