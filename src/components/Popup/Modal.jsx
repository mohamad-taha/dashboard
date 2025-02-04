import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Modal.css";
import { Context } from "../../context/Context";

const Modal = ({ itemId, reload, setReload }) => {
  const { modal, setModal, modalContent } = useContext(Context);
  const navigate = useNavigate();

  const okBtn = async () => {
    if (modalContent === "Are you sure you want to Logout?") {
      try {
        const response = await fetch("https://vica.website/api/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: Cookies.get("token"),
          },
        });
        if (response.ok) {
          Cookies.remove("token");
          Cookies.remove("user");
          setModal(false);
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await fetch("https://vica.website/api/items/" + itemId, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            AUTHORIZATION: Cookies.get("token"),
          },
        });
        setReload(!reload);
        setModal(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      className="modal"
      style={{ transform: modal ? "scale(1)" : "scale(0)" }}
    >
      <div className="overlay"></div>
      <div
        style={{ transform: modal ? "scale(1)" : "scale(0)" }}
        className="content"
      >
        <p>{modalContent}</p>
        <div className="actions">
          <button
            aria-label={
              modalContent === "Are you sure you want to Logout?"
                ? "continue to logout"
                : "confirm delete item"
            }
            onClick={() => okBtn()}
          >
            Yes
          </button>
          <button aria-label="close popup" onClick={() => setModal(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
