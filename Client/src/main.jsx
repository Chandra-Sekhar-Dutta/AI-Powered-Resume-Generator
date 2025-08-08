// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SigninPage from "./Auth/Sign-in/SigninPage.jsx";
import App from "./App.jsx";
import Home from "./Home/Home.jsx";
import DashBoard from "./DashBoard/DashBoard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import EditResume from "./DashBoard/resume/[resumeId]/edit/EditResume.jsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume/>
      }
    ]
  },
  {
    path: "/",
    element: <Home />
  },

  {
    path: "/auth/sign-in",
    element: <SigninPage />,
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>

);
