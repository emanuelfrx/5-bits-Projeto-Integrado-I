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
import Users from './pages/dashboard/users';

//Monitor
import HomeMonitor from './pages/monitor/layout';
import MonitorEvents from './pages/monitor/monitorevents';
import MonitorIndex from './pages/monitor';

//template
import ThemeProvider from './components/template/utils/ThemeContext';

import { AuthContext, AuthContextProvider } from './context/authContext';
import StudentsForm from './pages/dashboard/addstudents';
import PresenceEvents from './pages/dashboard/presences_events';
import PresenceLectures from './pages/dashboard/presences_lectures';
import PresenceStudents from './pages/dashboard/presences_students';
import EventUpdate from './pages/dashboard/event_update';
import Certificates from './pages/dashboard/certificates';
import EventForm2 from './pages/dashboard/event_form_2';
import EventForm3 from './pages/dashboard/event_form_3';

const ProtectedRouteAdmin = ({children}) => {

  const {currentUser} = useContext(AuthContext)

  if(!currentUser){
    return <Navigate to="/login" />
  }

  return children
}

const ProtectedRouteMonitor = ({children}) => {

  const {currentMonitor} = useContext(AuthContext)

  if(!currentMonitor){
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
        element: <ProtectedRouteAdmin><ThemeProvider><HomeAdmin/></ThemeProvider></ProtectedRouteAdmin>,
        children: [
          {
            path: "dashboard",
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
          },
          {
            path: "addevent2/:idevent",
            element: <EventForm2 />
          },
          {
            path: "addevent3/:idevent",
            element: <EventForm3 />
          },
          {
            path: "users",
            element: <Users />
          },
          {
            path: "addstudents",
            element: <StudentsForm />
          },
          {
            path:"presences",
            element: <PresenceEvents/>
          },
          {
            path:"events_lectures/:idevent",
            element: <PresenceLectures/>
          },
          {
            path:"events_students/:idevent/:idlecture/:idclass",
            element: <PresenceStudents/>
          },
          {
            path:"updateevent/:idevent",
            element:<EventUpdate/>
          },
          {
            path:"certification_students/:idevent/:idlecture",
            element: <Certificates/>
          }
        ]
      },
      {
        path:"monitor",
        element: <ProtectedRouteMonitor><ThemeProvider><HomeMonitor/></ThemeProvider></ProtectedRouteMonitor>,
        children: [
          {
            path: "dashboard",
            element: <MonitorIndex />
          },
          {
            path: "events",
            element: <MonitorEvents />
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