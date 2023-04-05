import { useRoutes } from "react-router-dom";
import { RequireAuth } from "./Pages";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Login from "./Pages/Auth/Login";
import RequireAdmin from "./Pages/Auth/RequireAdmin";
import RequireUser from "./Pages/Auth/RequireUser";
import SignUp from "./Pages/Auth/SignUp";
import Blog from "./Pages/Blog/Blog";
import AddProduct from "./Pages/Dashboard/Admin/AddProduct";
import MakeAdmin from "./Pages/Dashboard/Admin/MakeAdmin";
import ManageAllOrders from "./Pages/Dashboard/Admin/ManageAllOrders";
import ManageProducts from "./Pages/Dashboard/Admin/ManageProducts";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyProfile from "./Pages/Dashboard/MyProfile/MyProfile";
import AddReview from "./Pages/Dashboard/Users/AddReview";
import MyOrders from "./Pages/Dashboard/Users/MyOrders";
import OtherSettings from "./Pages/Dashboard/Users/OtherSettings";
import UserHistory from "./Pages/Dashboard/Users/UserHistory";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Purchase from "./Pages/Purchase/Purchase";
import Pricelist from "./Pages/Dashboard/Pricelist/Pricelist";
import Invoices from "./Pages/Dashboard/Invoices/Invoices";


const Router = () => {
   return useRoutes([
      {
         path: "/dashboard",
         element: (
            <RequireAuth>
               <Dashboard />
            </RequireAuth>
         ),
         children: [
            {
               path: "myorders",
               element: (
                  <RequireUser>
                     <MyOrders />
                  </RequireUser>
               ),
            },
            {
               path: "pricelists",
               element: (
                  <RequireUser>
                     <Pricelist />
                  </RequireUser>
               ),
            },
            {
               path: "invoice",
               element: (
                  <RequireUser>
                     <Invoices />
                  </RequireUser>
               ),
            },
            {
               path: "history",
               element: (
                  <RequireUser>
                     <UserHistory />
                  </RequireUser>
               ),
            },
            {
               path: "othersettings",
               element: (
                  <RequireUser>
                     <OtherSettings />
                  </RequireUser>
               ),
            },
            { index: true, element: <MyProfile /> },
            {
               path: "addreview",
               element: (
                  <RequireUser>
                     <AddReview />
                  </RequireUser>
               ),
            },
            {
               path: "manageallorders",
               element: (
                  <RequireAdmin>
                     <ManageAllOrders />
                  </RequireAdmin>
               ),
            },
            {
               path: "addproduct",
               element: (
                  <RequireAdmin>
                     <AddProduct />
                  </RequireAdmin>
               ),
            },
            {
               path: "manageproducts",
               element: (
                  <RequireAdmin>
                     <ManageProducts />
                  </RequireAdmin>
               ),
            },
            {
               path: "makeadmin",
               element: (
                  <RequireAdmin>
                     <MakeAdmin />
                  </RequireAdmin>
               ),
            },
         ],
      },
      {
         path: "/",
         element: <Home />,
      },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      {
         path: "purchase/:purchaseId",
         element: (
            <RequireAuth>
               <Purchase />
            </RequireAuth>
         ),
      },
      { path: "blog", element: <Blog /> },
      { path: "*", element: <NotFound /> },
   ]);
};

export default Router;