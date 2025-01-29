import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../components/ProductsTable/Table";
import Modal from "../components/Popup/Modal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);

  const [itemId, setItemId] = useState(null);
  const [reload, setReload] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar title="Products" />
        <Table setItemId={setItemId} reload={reload} />
      </div>
      <Modal itemId={itemId} setReload={setReload} reload={reload} />
    </div>
  );
};

export default Home;
