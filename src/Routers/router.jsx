import {
      createBrowserRouter,

} from "react-router-dom";
import Main from "../layout.jsx/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";

import Login from "../pages/Login/Login";

import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout.jsx/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";
import DonationRequest from "../pages/Dashboard/DonationRequest/DonationRequest";
import MyDonationRequest from "../pages/Dashboard/MyDonationRequest/MyDonationRequest";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import AllBloodDonationRequest from "../pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";
import AdminRoute from "./AdminRoute";
import RoleRoute from "./RoleRoute";
import ContantMangment from "../pages/Dashboard/ContentMangment/ContantMangment";
import AddBlog from "../pages/Dashboard/AddBlog/AddBlog";
import SearchPage from "../pages/Home/SearchPage/SearchPage";
import BloodDonationRequest from "../pages/Home/BloodDonationRequest/BloodDonationRequest";
import BloodDonationRequestDetail from "../pages/Home/BloodDonationRequestDetails/BloodDonationRequestDetail";
import Blog from "../pages/Home/Blog/Blog";
import EditDonationRequest from "../pages/Dashboard/MyDonationRequest/EditDonationRequest";
import FundingPage from "../Components/FundingPage.jsx/FundingPage";
import BlogDetails from "../pages/Home/Blog/BlogDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      
      {
        path: "funding",
        element: <PrivateRoute><FundingPage></FundingPage></PrivateRoute>
      },
      {
        path:"searchPage",
        element:<SearchPage></SearchPage>
      },
      {
        path:"blood-donation-request",
        element:<BloodDonationRequest></BloodDonationRequest>
      },
      {
        path:"/donation-details/:id",
        element:<PrivateRoute><BloodDonationRequestDetail></BloodDonationRequestDetail></PrivateRoute>
      },
      {
        path:"blog",
        element:<Blog></Blog>
      },
      {
        path:"/blogs/:id",
        element:<BlogDetails />
      },
    ]  // <-- close children array
  },   // <-- close first root route object, ADD THIS MISSING CLOSING BRACE + COMMA

  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path:"/dashboard",
        element:<DashboardHome></DashboardHome>
      },
      //admin route
      {
        path:"all-users",
        element:<AllUser></AllUser>
      },
      {
        path:"all-blood-donation-request",
        element:<AllBloodDonationRequest></AllBloodDonationRequest>
      },
      {
        path:"content-management",
        element:<ContantMangment></ContantMangment>,
        children: [
          {
            path:"add-blog",
            element:<AddBlog></AddBlog>
          },
        ]
      },
      //all user route
      {
        path:"profile",
        element:<Profile></Profile>
      },
      {
        path:"create-donation-request",
        element:<DonationRequest></DonationRequest>
      },
      {
  path: "edit-donation/:id",
  element: <EditDonationRequest />,
}
,
      {
        path:"my-donation-requests",
        element:<MyDonationRequest></MyDonationRequest>
      },
    ]
  },
]);
