import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import Homepage from "./pages/Homepage";
import Host from "./pages/Host";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <SignupPage />,
      },
      {
        path: "/host",
        element: <Host />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
