import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "task-manager-532ce.firebaseapp.com",
  projectId: "task-manager-532ce",
  storageBucket: "task-manager-532ce.appspot.com",
  messagingSenderId: "152128261229",
  appId: "1:152128261229:web:ae25ad284403a37a4ac364",
  measurementId: "G-C0E80B4LGD",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a test task to Firestore
const addTestTask = async () => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: "Test Task",
      completed: false,
      createdAt: serverTimestamp(), // Use Firestore server timestamp
    });
    console.log(`✅ Test task added successfully! Document ID: ${docRef.id}`);
  } catch (error) {
    console.error("❌ Error adding test task:", error.message);
  }
};

export { db, addTestTask };
