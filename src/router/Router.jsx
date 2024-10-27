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
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";

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
        loader: () =>
          fetch("https://a5-tech-tonic-mern-server.vercel.app/products"),
      },
      {
        path: "/productsCategory/:categoryName",
        element: <CategoryProducts />,
        loader: ({ params }) =>
          fetch(
            `https://a5-tech-tonic-mern-server.vercel.app/categories/${params.categoryName}`
          ),
      },
      {
        path: "/products/:_id",
        loader: ({ params }) =>
          fetch(
            `https://a5-tech-tonic-mern-server.vercel.app/products/${params._id}`
          ),
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
          fetch(
            `https://a5-tech-tonic-mern-server.vercel.app/users/${params.email}`
          ),
      },
      {
        path: "allCategory",
        element: <AllCategory />,
        loader: () =>
          fetch("https://a5-tech-tonic-mern-server.vercel.app/categories"),
      },
      {
        path: "allProducts",
        loader: () =>
          fetch("https://a5-tech-tonic-mern-server.vercel.app/products"),
        element: (
          <AdminRoutes>
            <AllProducts />
          </AdminRoutes>
        ),
      },
      {
        path: "addProduct",
        loader: () =>
          fetch("https://a5-tech-tonic-mern-server.vercel.app/products"),
        element: (
          <AdminRoutes>
            <AddProduct></AddProduct>
          </AdminRoutes>
        ),
      },
      {
        path: "addCategory",
        // loader: () =>
        //   fetch("https://a5-tech-tonic-mern-server.vercel.app/products"),
        element: (
          <AdminRoutes>
            <AddCategory />
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
