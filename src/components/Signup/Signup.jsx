import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [file, setFile] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("user_name", firstName + " " + lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      formData.append("profile_image", file);

      const response = await fetch("https://vica.website/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        Cookies.set("user", JSON.stringify(data.data.user));
        Cookies.set("token", "Bearer " + data.data.token);
        navigate("/products");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={register}>
      <div>
        <h1>Sign Up</h1>
        <p>Create an account to continue</p>
        <div>
          <label htmlFor="firstName">
            First Name
            <input
              required
              className="input"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="lastName">
            Last Name
            <input
              required
              className="input"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm
            <input
              required
              className="input"
              type="password"
              id="confirmPassword"
              name="password"
              placeholder="********"
              onChange={(e) => setConfrimPassword(e.target.value)}
            />
          </label>
          <label htmlFor="image">
            Profile Image
            <div>
              {file ? (
                <img
                  style={{ width: "100%" }}
                  src={URL.createObjectURL(file)}
                  alt="uploaded image"
                />
              ) : (
                <img src="./assets/imgs/UploadIcon.svg" alt="upload" />
              )}
            </div>
            <input
              required
              type="file"
              id="image"
              name="profilePhoto"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to={"/"}>Sign In</Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
