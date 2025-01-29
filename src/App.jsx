import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import ProductsForm from "./pages/Products/ProductsForm";
import { ContextProvider } from "./context/Context";
import "./App.css";

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/products" element={<Home />} />
          <Route path="/add" element={<ProductsForm />} />
          <Route path="/edit/:id" element={<ProductsForm />} />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
