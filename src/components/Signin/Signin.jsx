import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as yup from "yup";

const Signin = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        const response = await fetch("https://vica.website/api/login", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          Cookies.set("user", JSON.stringify(data.user));
          Cookies.set("token", "Bearer " + data.token);
          navigate("/products");
        } else {
          setErrors({ api: "Invalid email or password" });
        }
      } catch (error) {
        console.error(error);
        setErrors({ api: "something is wrong tyr again later" });
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h1>Sign In</h1>
        <p>Please enter your email and password to continue</p>
        <label htmlFor="email">
          Email
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="errorMsg">{formik.errors.email}</div>
          ) : null}
        </label>
        <label htmlFor="password">
          Password
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="errorMsg">{formik.errors.password}</div>
          ) : null}
        </label>
        {formik.errors.api && (
          <div className="errorMsg">{formik.errors.api}</div>
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={
            formik.isSubmitting
              ? { cursor: "not-allowed", background: "#4264b3" }
              : {}
          }
        >
          {formik.isSubmitting ? "Signing In..." : "Sign In"}
        </button>
        <p>
          Don’t have an account?
          <Link to={"./signup"}>Signup</Link>
        </p>
      </div>
    </form>
  );
};

export default Signin;
