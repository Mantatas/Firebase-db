import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMjkGq9pwCxQHr0KqA5ab6luNqhZ_Iag4",
  authDomain: "mantas-26a39.firebaseapp.com",
  projectId: "mantas-26a39",
  storageBucket: "mantas-26a39.appspot.com",
  messagingSenderId: "920496579535",
  appId: "1:920496579535:web:e988e78674f461936c28ba",
  measurementId: "G-63XYKTNT71",
  databaseURL:
    "https://mantas-26a39-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const dataBase = getDatabase(app);

const inputProductCode = document.querySelector("#inputProductCode");
const inputProductName = document.querySelector("#inputProductName");
const inputProductQuantity = document.querySelector("#inputProductQty");
const findProductCode = document.querySelector("#findProductCode");
const insertButton = document.querySelector("#insertBtn");
const updateButton = document.querySelector("#updateBtn");
const deleteButton = document.querySelector("#deleteBtn");
const findButton = document.querySelector("#selectBtn");

function insertData() {
  //   evt.preventDefault();
  set(ref(dataBase, "Products/" + inputProductCode.value), {
    ID: inputProductCode.value,
    Name: inputProductName.value,
    Quantity: inputProductQuantity.value,
  });
  //   .then(() => {
  //     alert("data added bro");
  //   }).catch((error) => {
  //     alert(`ya dun goofed. ${error}`);
  //   });
}

insertButton.addEventListener("click", insertData());
console.log(getDatabase());
