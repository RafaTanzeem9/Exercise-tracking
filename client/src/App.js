import "./App.css";
import { Route, Routes } from "react-router";
import Register from "./screens/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <h1>MyApp</h1>
      <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
