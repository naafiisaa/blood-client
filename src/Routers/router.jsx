import {
      createBrowserRouter,

} from "react-router-dom";
import Main from "../layout.jsx/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SearchDonars from "../pages/SearchDonars/SearchDonars";
import Login from "../pages/Login/Login";
import FoundingPage from "../Components/FoundingPage.jsx/FoundingPage";
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
                        path: "login",
                        element: <Login></Login>,
                  },
                  {
                        path: "register",
                        element: <Register></Register>,
                  },

                  {
                        path: "searchDonars",
                        element: <SearchDonars></SearchDonars>
                  },
                  {
                        path: "founding",
                        element: <PrivateRoute><FoundingPage></FoundingPage></PrivateRoute>
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
                        path: "blood-donation-request-details",
                        element: <PrivateRoute>
                          <BloodDonationRequestDetail></BloodDonationRequestDetail>
                        </PrivateRoute>,
                  },
                  {
                        path:"blog",
                        element:<Blog></Blog>
                  },
            ]
      },
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
                        path:"allUser",
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
                        path:"donationRequest",
                        element:<DonationRequest></DonationRequest>
                  },
                  {
                        path:"myDonationRequest",
                        element:<MyDonationRequest></MyDonationRequest>
                  },
                 
            ]
      },
]);