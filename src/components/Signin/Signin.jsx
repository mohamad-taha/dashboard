import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("https://vica.website/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        Cookies.set("user", JSON.stringify(data.user));
        Cookies.set("token", "Bearer " + data.token);
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={login}>
      <div>
        <h1>Sign In</h1>
        <p>Please enter your email and password to continue</p>
        <label htmlFor="email">
          Email
          <input
            required
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={(e) => setPaswword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit">Sign In</button>
        <p>
          Don’t have an account?
          <Link to={"./signup"}>Signup</Link>
        </p>
      </div>
    </form>
  );
};

export default Signin;
