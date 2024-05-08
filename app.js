import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
  push,
  update,
  remove,
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

const inputProductCode = document.querySelector("#inputProductCode");
const inputProductName = document.querySelector("#inputProductName");
const inputProductQuantity = document.querySelector("#inputProductQty");
const findProductCode = document.querySelector("#findProductCode");
const insertButton = document.querySelector("#insertBtn");
const updateButton = document.querySelector("#updateBtn");
const deleteButton = document.querySelector("#deleteBtn");
const findButton = document.querySelector("#selectBtn");

const app = initializeApp(firebaseConfig);
const dataBase = getDatabase(app);
const dbRef = ref(getDatabase(app));

function insertData(e) {
  e.preventDefault();
  const newProductId = inputProductCode.value;

  get(child(ref(dataBase), "Products/" + newProductId))
    .then((snapshot) => {
      if (inputProductCode.value.length === 0) {
        alert("forgot id idiot");
        return;
      }
      if (inputProductName.value.length === 0) {
        alert("forgot name idiot");
        return;
      }
      if (inputProductQuantity.value.length === 0) {
        alert("forgot quantity idiot");
        return;
      }
      if (snapshot.exists()) {
        alert("Duplicate ID found. Cannot insert data.");
      } else {
        set(ref(dataBase, "Products/" + newProductId), {
          ID: newProductId,
          Name: inputProductName.value,
          Quantity: inputProductQuantity.value,
        })
          .then(() => {
            alert("Data added successfully.");
          })
          .catch((error) => {
            alert(`An error occurred: ${error}`);
          });
      }
    })
    .catch((error) => {
      // Handle error
      console.error("Error checking for duplicate ID:", error);
      alert("An error occurred while checking for duplicate ID.");
    });
}

function findData(e) {
  e.preventDefault();
  get(child(dbRef, `Products/${findProductCode.value}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const findData = snapshot.val();
        document.querySelector(
          "#resultProductCode"
        ).value = `Product Name: ${findData.Name}`;
        document.querySelector(
          "#resultProductQuantity"
        ).value = `Product Quantity: ${findData.Quantity}`;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateData(e) {
  e.preventDefault();
  const newProductId = inputProductCode.value;

  get(child(ref(dataBase), "Products/" + newProductId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        set(ref(dataBase, "Products/" + newProductId), {
          ID: newProductId,
          Name: inputProductName.value,
          Quantity: inputProductQuantity.value,
        })
          .then(() => {
            alert("Data added successfully.");
          })
          .catch((error) => {
            alert(`An error occurred: ${error}`);
          });
      } else {
        alert("id not found.");
      }
    })
    .catch((error) => {
      // Handle error
      console.error("Error checking for duplicate ID:", error);
      alert("An error occurred while checking for duplicate ID.");
    });
}

deleteButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (productCode.value.length <= 0) {
    alert("Product code can not be blank!");
    return;
  }
  if (productName.value.length === "") {
    return;
  }
  if (productQuantity.value.length === "") {
    return;
  }
  const productRef = ref(db, "products/" + productCode.value);
  get(productRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        remove(productRef);
        alert("Deleted successfully!");
      } else {
        alert("Product with this code does not exist!");
      }
    })
    .catch((error) => {
      console.log("Error deleting data:", error);
    });
});

insertButton.addEventListener("click", insertData);
findButton.addEventListener("click", findData);
updateButton.addEventListener("click", updateData);

