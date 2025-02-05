import React from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Btn = () => {
  const navigate = useNavigate();
  const popup = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgba(239, 56, 38, 1)",
      cancelButtonColor: "#4880ff",
      confirmButtonText: "Yes, sign out!",
    });
    if (result.isConfirmed) {
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
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <button aria-label="sign out" className="logout" onClick={popup}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.40137 0.979218H9.77637V9.22922H8.40137V0.979218ZM6.33887 1.45187V2.95578C5.1071 3.47141 4.10449 4.30213 3.33105 5.44797C2.58626 6.5938 2.21387 7.85422 2.21387 9.22922C2.21387 11.1198 2.88704 12.7383 4.2334 14.0847C5.57975 15.431 7.19824 16.1042 9.08887 16.1042C10.9795 16.1042 12.598 15.431 13.9443 14.0847C15.2907 12.7383 15.9639 11.1198 15.9639 9.22922C15.9639 7.85422 15.5771 6.5938 14.8037 5.44797C14.0589 4.30213 13.0706 3.47141 11.8389 2.95578V1.45187C13.4717 2.02479 14.7894 3.02739 15.792 4.45969C16.8232 5.86333 17.3389 7.45318 17.3389 9.22922C17.3389 11.4922 16.5225 13.4402 14.8896 15.073C13.2855 16.6771 11.3519 17.4792 9.08887 17.4792C6.82585 17.4792 4.87793 16.6771 3.24512 15.073C1.64095 13.4402 0.838867 11.4922 0.838867 9.22922C0.838867 7.45318 1.34017 5.86333 2.34277 4.45969C3.37402 3.02739 4.70605 2.02479 6.33887 1.45187Z"
          fill="#202224"
        />
      </svg>
      Logout
    </button>
  );
};

export default Btn;
