import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import RegisterEmployee from "./Pages/RegisterEmployee";
import Employees from "./Pages/Employees";

function App() {
  return (
    <div className="App">
      <Header />
      {/*routing over the pages*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterEmployee />} />
        <Route path="/Allemployees" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default App;
