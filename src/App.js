import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductTable from "./components/ProductTable";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
