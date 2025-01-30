import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import uploadImage from "../../../public/assets/imgs/UploadIcon.svg";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [open, setOpen] = React.useState(false);
  const [snackContent, setSnackContent] = React.useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState("");
  const [defaultData, setDefaultData] = useState({});

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (params.id) {
      const fetchItem = async () => {
        try {
          const response = await fetch(
            `https://vica.website/api/items/${params.id}`,
            {
              headers: {
                Accept: "application/json",
                AUTHORIZATION: Cookies.get("token"),
              },
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setDefaultData(data);
          setName(data.name);
          setPrice(data.price);
        } catch (err) {
          console.log(err);
        }
      };
      fetchItem();
    }
  }, [params.id]);

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", file);
      if (localStorage.getItem("edit") === "true") {
        formData.append("_method", "PUT");
      }
      const response = await fetch(
        localStorage.getItem("edit") === "true"
          ? `https://vica.website/api/items/${params.id}`
          : "https://vica.website/api/items",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            AUTHORIZATION: Cookies.get("token"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        setOpen(true);
        setSnackContent("Something is wrong don't leave any field blank");
      }

      if (response.ok) {
        setSnackContent("The process was completed successfully");
        setOpen(true);
        setTimeout(() => {
          navigate("/products");
          localStorage.setItem("edit", false);
        }, 2000);
      }
    } catch {
      setOpen(true);
      setSnackContent("Error connecting to server try again later");
    }
  };

  return (
    <div className="productsForm">
      <h1>
        {localStorage.getItem("edit") === "true"
          ? "Edit Product"
          : "Add Product"}
      </h1>
      <form onSubmit={sendData}>
        <div>
          <label htmlFor="productName">
            Product Name
            <input
              defaultValue={defaultData?.name}
              required
              onChange={(e) => setName(e.target.value)}
              className="input"
              type="text"
              name="productName"
              id="productName"
              placeholder="Product Name"
            />
          </label>
          <label htmlFor="productPrice">
            Price
            <input
              defaultValue={defaultData?.price}
              required
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              type="text"
              name="productPrice"
              id="productPrice"
              placeholder="Price"
            />
          </label>
          <button type="submit">Save</button>
        </div>
        <label htmlFor="productImage">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : defaultData?.image_url
                ? defaultData.image_url
                : uploadImage
            }
            alt={
              file || defaultData?.image_url ? "uploaded image" : "upload image"
            }
          />

          <input
            required={localStorage.getItem("edit") ? false : true}
            type="file"
            name="productImage"
            id="productImage"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </form>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            snackContent === "The process was completed successfully"
              ? "success"
              : "error"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackContent}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
