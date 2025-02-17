import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import editIcon from "../../assets/imgs/edit.svg";
import binIcon from "../../assets/imgs/bin.svg";
import "./Table.css";

const Table = ({ setItemId, reload, setReload }) => {
  const popup = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(239, 56, 38, 1)",
      cancelButtonColor: "#4880ff",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      setItemId(id);
      try {
        await fetch("https://vica.website/api/items/" + id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            AUTHORIZATION: Cookies.get("token"),
          },
        });
        setReload(!reload);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://vica.website/api/items", {
          headers: {
            Accept: "application/json",
            AUTHORIZATION: Cookies.get("token"),
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch {
        setData("Error fetching items:");
      }
      setLoading(false);
    };
    getData();
  }, [reload]);

  return (
    <div className="tableContainer">
      <div className="header">
        <span>Manage Products</span>
        <button
          aria-label="go to /add page"
          onClick={() => {
            localStorage.setItem("edit", false);
            navigate("/add");
          }}
        >
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.7494 10.3337C4.7494 10.5491 4.82842 10.7558 4.96907 10.9082C5.10973 11.0606 5.30049 11.1462 5.4994 11.1462C5.69832 11.1462 5.88908 11.0606 6.02974 10.9082C6.17039 10.7558 6.2494 10.5491 6.2494 10.3337V6.81283H9.4994C9.69832 6.81283 9.88908 6.72722 10.0297 6.57485C10.1704 6.42248 10.2494 6.21581 10.2494 6.00033C10.2494 5.78484 10.1704 5.57817 10.0297 5.4258C9.88908 5.27343 9.69832 5.18783 9.4994 5.18783H6.2494V1.66699C6.2494 1.4515 6.17039 1.24484 6.02974 1.09247C5.88908 0.940095 5.69832 0.854492 5.4994 0.854492C5.30049 0.854492 5.10973 0.940095 4.96907 1.09247C4.82842 1.24484 4.7494 1.4515 4.7494 1.66699V5.18783H1.4994C1.30049 5.18783 1.10973 5.27343 0.969075 5.4258C0.828423 5.57817 0.749405 5.78484 0.749405 6.00033C0.749405 6.21581 0.828423 6.42248 0.969075 6.57485C1.10973 6.72722 1.30049 6.81283 1.4994 6.81283H4.7494V10.3337Z"
              fill="white"
            />
          </svg>
          Add Product
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product, idx) => (
            <tr key={idx}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{`$${product.price}`}</td>
              <td>
                <img
                  loading="lazy"
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                  }}
                />
              </td>
              <td>
                <div>
                  <button
                    aria-label="go to /edit page"
                    onClick={() => {
                      localStorage.setItem("edit", true);
                      navigate(`/edit/${product.id}`);
                    }}
                  >
                    <img src={editIcon} alt="edit" />
                  </button>
                  <button
                    aria-label="delete item"
                    onClick={() => {
                      popup(product.id);
                    }}
                  >
                    <img src={binIcon} alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && !loading && (
        <p className="emptyData">No products found!</p>
      )}
      {loading && <div className="loader"></div>}
    </div>
  );
};

export default Table;
