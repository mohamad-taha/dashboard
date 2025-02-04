import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      file: null,
    },
    validationSchema: yup.object({
      firstName: yup.string().required("firstName is required"),
      lastName: yup.string().required("lastnName is required"),
      email: yup.string().email().required("email is required"),
      password: yup.string().min(8).required("password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "password does not match")
        .required("confitm password is required"),
      file: yup.mixed().nullable().required("image is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append("first_name", values.firstName);
        formData.append("last_name", values.lastName);
        formData.append("user_name", values.firstName + " " + values.lastName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("password_confirmation", values.confirmPassword);
        if (values.file) formData.append("profile_image", values.file);

        const response = await fetch("https://vica.website/api/register", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          Cookies.set("user", JSON.stringify(data.data.user));
          Cookies.set("token", "Bearer " + data.data.token);
          navigate("/products");
        } else {
          if (data.message.includes("email")) {
            setErrors({ api: "email is already taken" });
          } else {
            setErrors({ api: "something is wrong try again later" });
          }
        }
      } catch (error) {
        console.error(error);
        setErrors({ api: "could not connect to server. Try again later." });
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h1>Sign Up</h1>
        <p>Create an account to continue</p>
        <div>
          <label htmlFor="firstName">
            First Name
            <input
              className="input"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="errorMsg">{formik.errors.firstName}</div>
            ) : null}
          </label>
          <label htmlFor="lastName">
            Last Name
            <input
              className="input"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="errorMsg">{formik.errors.lastName}</div>
            ) : null}
          </label>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="errorMsg">{formik.errors.password}</div>
            ) : null}
          </label>
          <label htmlFor="confirmPassword">
            Confirm
            <input
              className="input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="errorMsg">{formik.errors.confirmPassword}</div>
            ) : null}
          </label>
          <label htmlFor="image">
            Profile Image
            <div>
              {formik.values.file ? (
                <img
                  style={{ width: "100%" }}
                  src={URL.createObjectURL(formik.values.file)}
                  alt="uploaded image"
                />
              ) : (
                <img src="./assets/imgs/UploadIcon.svg" alt="upload icon" />
              )}
            </div>
            <input
              type="file"
              id="image"
              name="profilePhoto"
              onChange={(e) =>
                formik.setFieldValue("file", e.currentTarget.files[0])
              }
            />
            {formik.touched.file && formik.errors.file ? (
              <div className="errorMsg">{formik.errors.file}</div>
            ) : null}
          </label>
          {formik.errors.api && (
            <div className="errorMsg">{formik.errors.api}</div>
          )}
        </div>
      </div>
      <div>
        <button
          aria-label="sign up"
          type="submit"
          disabled={formik.isSubmitting}
          style={
            formik.isSubmitting
              ? { cursor: "not-allowed", background: "#4264b3" }
              : {}
          }
        >
          {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
        <p>
          Already have an account? <Link to={"/"}>Sign In</Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
