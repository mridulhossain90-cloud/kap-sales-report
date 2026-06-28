import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkSxNNawInB3_jqwr5m32vI7IfK3nBy2c",
  authDomain: "khan-agri-report.firebaseapp.com",
  projectId: "khan-agri-report",
  storageBucket: "khan-agri-report.firebasestorage.app",
  messagingSenderId: "525067682644",
  appId: "1:525067682644:web:5c75205bfbd9b0acc27ec1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginButton = document.querySelector("button");

loginButton.addEventListener("click", async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
  } catch (error) {
    alert("Login failed. Please check email and password.");
  }
});