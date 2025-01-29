import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register">
      <Outlet />
    </div>
  );
};

export default Login;
