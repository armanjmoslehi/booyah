// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Firebase config (replace with your own Firebase config details)
const firebaseConfig = {
    apiKey: "AIzaSyBMiDKDPnkFWZGqrcgMRa4f6GxohGbvqyg",
    authDomain: "booyah2-f00fc.firebaseapp.com",
    projectId: "booyah2-f00fc",
    storageBucket: "booyah2-f00fc.firebasestorage.app",
    messagingSenderId: "278778285303",
    appId: "1:278778285303:web:f57c7297a1097ee4d6d7f2",
    measurementId: "G-2WKECGFX18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const messageContent = document.getElementById('message-content');
const postBtn = document.getElementById('post-btn');
const messagesList = document.getElementById('messages-list');

// Function to post a message
const postMessage = async () => {
  const message = messageContent.value;
  if (message.trim() === "") {
    alert("Please write a message.");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      content: message,
      timestamp: new Date(),
    });
    messageContent.value = ""; // Clear the input field after posting
  } catch (error) {
    console.error("Error posting message:", error);
  }
};

postBtn.addEventListener('click', postMessage);

// Function to display messages in real-time
const displayMessages = () => {
  const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));

  onSnapshot(q, (querySnapshot) => {
    messagesList.innerHTML = ""; // Clear the list before adding new messages

    querySnapshot.forEach((doc) => {
      const message = doc.data();
      const messageItem = document.createElement("div");
      messageItem.classList.add("message");
      messageItem.innerHTML = `
        <p>${message.content}</p>
        <small>Posted on: ${message.timestamp.toDate().toLocaleString()}</small>
      `;
      messagesList.appendChild(messageItem);
    });
  });
};

// Display messages in real-time when page loads
displayMessages();

  