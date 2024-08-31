// src/App.js
import React, { useState } from "react";
import Form from "./Components/Form";
import Table from "./Components/Table";
import "./App.css";
function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleFormSuccess = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Clear success state after 3 seconds
  };

  return (
    <div className="App">
      <Form onSuccess={handleFormSuccess} />
      {submitted && <p>Form submitted successfully!</p>}
      <Table />
    </div>
  );
}

export default App;
