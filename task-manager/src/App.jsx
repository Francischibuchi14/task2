import React, { useEffect } from "react";
import { addTestTask } from "./firebaseConfig";
import TaskManager from "./TaskManager"; // Import TaskManager

function App() {
  useEffect(() => {
    addTestTask();
  }, []);

  return (
    <div>
      <h1>Firestore Test: Check Console & Firebase</h1>
      <TaskManager /> {TaskManager.jsx}
    </div>
  );
}

export default App;
