import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Index.jsx";
import ChatBox from "./components/ChatBox/Index.jsx";
import SignUp from "./components/SignUp/Index.jsx";
import { Context } from "./context/ApiContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chatbox",
    element: <ChatBox />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      {" "}
      {/* Ensure that Context wraps everything */}
      <RouterProvider router={router} />
    </Context>
  </StrictMode>
);
