import { createBrowserRouter } from "react-router-dom";
import Auth from "./../pages/Auth/Auth";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";
import Home from "../pages/Home";
import ProductsForm from "../pages/Products/ProductsForm";

const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Auth />,
      children: [
        { index: true, element: <Signin /> },
        { path: "signup", element: <Signup /> },
      ],
    },
    { path: "/products", element: <Home /> },
    { path: "/add", element: <ProductsForm /> },
    { path: "/edit/:id", element: <ProductsForm /> },
  ],
  {
    basename: "/dashboard/",
  }
);

export default Router;
