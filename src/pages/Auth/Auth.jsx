import React from "react";
import { Outlet } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  return (
    <div className="register">
      <Outlet />
    </div>
  );
};

export default Login;
