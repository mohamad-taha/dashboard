import React, { useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import Cookies from "js-cookie";
import { Context } from "./../../context/Context";
import "./Navbar.css";

const Navbar = ({ title }) => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";
  const { setShowSidebar, showSidebar } = useContext(Context);

  return (
    <nav>
      <span>{title}</span>
      <div className="accountInfo">
        {user?.profile_image_url ? (
          <img
            width={40}
            height={40}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            src={user?.profile_image_url}
          />
        ) : (
          <MdAccountCircle fontSize={35} fill="#444444" />
        )}
        <div className="profileName">
          <span>{user ? user.user_name : "your name"}</span>
          <span>Admin</span>
        </div>
        <button
          className="listBtn"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? (
            <img width={20} src="./assets/imgs/close.svg" alt="close icon" />
          ) : (
            <img width={20} src="./assets/imgs/list.svg" alt="list icon" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
