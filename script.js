import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

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
const db = getFirestore(app);

window.showSection = function (sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  document.getElementById(sectionId).style.display = "block";
};

document.getElementById("loginBtn").addEventListener("click", async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "block";
  } catch (error) {
    alert("Login failed. Please check email and password.");
  }
});

document.getElementById("logoutBtn").addEventListener("click", async function () {
  await signOut(auth);
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("loginSection").style.display = "flex";
});

document.getElementById("saveSaleBtn").addEventListener("click", async function () {
  const saleDate = document.getElementById("saleDate").value;
  const dealerName = document.getElementById("dealerName").value.trim();
  const productName = document.getElementById("productName").value.trim();
  const quantity = Number(document.getElementById("quantity").value);
  const price = Number(document.getElementById("price").value);

  if (!saleDate || !dealerName || !productName || !quantity || !price) {
    alert("Please fill all sales fields");
    return;
  }

  const total = quantity * price;

  try {
    await addDoc(collection(db, "sales"), {
      saleDate,
      dealerName,
      productName,
      quantity,
      price,
      total,
      createdAt: new Date()
    });

    alert("Sale saved successfully");

    document.getElementById("dealerName").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
  } catch (error) {
    alert("Sale save failed. Firestore Database may not be enabled yet.");
  }
});

document.getElementById("saveDealerBtn").addEventListener("click", async function () {
  const name = document.getElementById("newDealerName").value.trim();
  const phone = document.getElementById("dealerPhone").value.trim();
  const area = document.getElementById("dealerArea").value.trim();

  if (!name || !phone || !area) {
    alert("Please fill all dealer fields");
    return;
  }

  try {
    await addDoc(collection(db, "dealers"), {
      name,
      phone,
      area,
      createdAt: new Date()
    });

    alert("Dealer saved successfully");

    document.getElementById("newDealerName").value = "";
    document.getElementById("dealerPhone").value = "";
    document.getElementById("dealerArea").value = "";
  } catch (error) {
    alert("Dealer save failed. Firestore Database may not be enabled yet.");
  }
});

document.getElementById("saveProductBtn").addEventListener("click", async function () {
  const name = document.getElementById("newProductName").value.trim();
  const price = Number(document.getElementById("productPrice").value);

  if (!name || !price) {
    alert("Please fill all product fields");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      createdAt: new Date()
    });

    alert("Product saved successfully");

    document.getElementById("newProductName").value = "";
    document.getElementById("productPrice").value = "";
  } catch (error) {
    alert("Product save failed. Firestore Database may not be enabled yet.");
  }
});

document.getElementById("loadReportBtn").addEventListener("click", async function () {
  const reportTable = document.getElementById("reportTable");
  reportTable.innerHTML = "";

  try {
    const q = query(collection(db, "sales"), orderBy("saleDate", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const sale = doc.data();

      reportTable.innerHTML += `
        <tr>
          <td>${sale.saleDate}</td>
          <td>${sale.dealerName}</td>
          <td>${sale.productName}</td>
          <td>${sale.quantity}</td>
          <td>${sale.total}</td>
        </tr>
      `;
    });
  } catch (error) {
    alert("Report load failed. Firestore Database may not be enabled yet.");
  }
});