import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <h1>TIC-TAC-TOE</h1>
      <div>
        <div className="board"></div>
      </div>
      <div className="status">{statusText}</div>
    </div>
  );
}

export default App;
