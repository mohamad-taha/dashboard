import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../components/ProductsTable/Table";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Context } from "../context/Context";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { setShowSidebar } = useContext(Context);

  const navigate = useNavigate();

  const [itemId, setItemId] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);

  window.onresize = () => {
    if (window.innerWidth > 1023) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>dashboard | products</title>
      </Helmet>

      <Navbar title="Products" />
      <Sidebar />
      <div>
        <div className="appContent">
          <Table
            setItemId={setItemId}
            itemId={itemId}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
