// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR-zTNAY2aYq3W9y5fX8iMbJg1KoJdGNI",
  authDomain: "part-time-thrift.firebaseapp.com",
  databaseURL: "https://part-time-thrift-default-rtdb.firebaseio.com",
  projectId: "part-time-thrift",
  storageBucket: "part-time-thrift.appspot.com",
  messagingSenderId: "760241332498",
  appId: "1:760241332498:web:fd9d3f07ca1d2739df93cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
signup.addEventListener('click',(e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var username = document.getElementById('fullname').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
        password: password
      })
        .then(() => {
          window.location.href = '../home.page/index.html';
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
});

login.addEventListener('click',(e)=>{
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const dt = new Date();
      update(ref(database, 'users/' + user.uid),{
        last_login: dt,
      })

      window.location.href = '../home.page/index.html';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
  });
});

function isValidEmail(email) {
  // use regex to check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


// login.addEventListener('click',(e)=>{
//   var email = document.getElementById('email').value;
//   var password = document.getElementById('password').value;

//      signInWithEmailAndPassword(auth, email, password)
//      .then((userCredential) => {
//        // Signed in 
//        const user = userCredential.user;

//        const dt = new Date();
//         update(ref(database, 'users/' + user.uid),{
//          last_login: dt,
//        })

//        window.location.href = '../home.page/index.html';
//        // ...
//      })
//      .catch((error) => {
//        const errorCode = error.code;
//        const errorMessage = error.message;

//        alert(errorMessage);
//  });
// });

// const user = auth.currentUser;
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     //bla bla bla
//     // ...
//   } else {
//     // User is signed out
//     // ...
//     //bla bla bla
//   }
// });
