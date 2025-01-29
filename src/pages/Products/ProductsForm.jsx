import React, { useEffect } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Popup/Modal";
import ProductsContent from "../../components/ProductsForm/Form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProductsForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar
          title={
            localStorage.getItem("edit") === "true"
              ? "Products / Edit"
              : "Products / Add"
          }
        />
        <ProductsContent />
      </div>
      <Modal />
    </div>
  );
};

export default ProductsForm;
