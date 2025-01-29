import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../components/ProductsTable/Table";
import Modal from "../components/Popup/Modal";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import Cookies from "js-cookie";
import { Context } from "../context/Context";

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

  const handlers = useSwipeable({
    onSwipedRight: () => setShowSidebar(true),
    onSwipedLeft: () => setShowSidebar(false),
    preventDefaultTouchmoveEvent: true,
  });

  window.onresize = () => {
    if (window.innerWidth > 1023) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  };

  return (
    <div className="app" {...handlers}>
      <Navbar title="Products" />
      <Sidebar />
      <div>
        <div className="appContent">
          <Table setItemId={setItemId} reload={reload} />
        </div>
      </div>
      <Modal itemId={itemId} setReload={setReload} reload={reload} />
    </div>
  );
};

export default Home;
