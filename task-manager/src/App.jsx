import React, { useEffect } from "react";
import { addTestTask } from "./firebaseConfig";

function App() {
  useEffect(() => {
    addTestTask();
  }, []);

  return <h1>Firestore Test: Check Console & Firebase</h1>;
}

export default App;
