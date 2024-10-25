import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layout/Dashboard";
import Profile from "../components/Profile";
import Cart from "../components/Cart";
import CategoryProducts from "../pages/CategoryProducts";
import EditProfile from "../components/EditProfile";
import AdminRoutes from "./AdminRoutes";
import AllUsers from "../components/AllUsers";
import EditUser from "../components/EditUser";
import AllCategory from "../components/AllCategory";
import AllProducts from "../components/AllProducts";

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
        path: "/productsCategory/:categoryName",
        element: <CategoryProducts />,
        loader: ({ params }) =>
          fetch(`http://localhost:5100/categories/${params.categoryName}`),
      },
      {
        path: "/products/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5100/products/${params.id}`),
        element: (
          <PrivateRoutes>
            <ProductDetails />
          </PrivateRoutes>
        ),
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
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "carts",
        element: <Cart />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/edit-user/:email",
        element: (
          <AdminRoutes>
            <EditUser></EditUser>
          </AdminRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5100/users/${params.email}`),
      },
      {
        path: "allCategory",
        element: <AllCategory />,
        loader: () => fetch("http://localhost:5100/categories"),
      },
      {
        path: "allProducts",
        loader: () => fetch("http://localhost:5100/products"),
        element: (
          <AdminRoutes>
            <AllProducts />
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
