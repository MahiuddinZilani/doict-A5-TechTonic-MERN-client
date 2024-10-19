import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
        loader: () => fetch("http://localhost:5100/products"),
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5100/products/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      // {
      //   path: "/products/:id/:category",
      //   element: <ProductDetails />,
      //   loader: ({ params }) =>
      //     fetch(
      //       `http://localhost:5100/products/${params.id}/${params.category}`
      //     ),
      // },
    ],
  },
]);

export default router;
