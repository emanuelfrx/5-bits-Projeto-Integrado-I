import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./global.css"

import Home from './pages/home/home';
import Login from "./pages/home/login"
import HomeAdmin from './pages/dashboard/layout';
import HomeIndex from './pages/dashboard';
import Profile from './pages/dashboard/profile';
import Events from './pages/dashboard/events';
import EventForm from './pages/dashboard/event_form';
import NewStudent from './pages/home/newstudent';
import { AuthContext, AuthContextProvider } from './context/authContext';

const ProtectedRoute = ({children}) => {

  const {currentUser} = useContext(AuthContext)

  if(!currentUser){
    return <Navigate to="/login" />
  }

  return children
}

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "",
        element: <Home />
      },
      {
        path: ":tag_link",
        element: <NewStudent />
      },
      {
        path:"home",
        element: <ProtectedRoute><HomeAdmin/></ProtectedRoute>,
        children: [
          {
            path: "",
            element: <HomeIndex />
          },
          {
            path: "events",
            element: <Events />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "addevent",
            element: <EventForm />
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);