import * as React from "react";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Visitas from "./routes/visitas";
import Jardineria from "./routes/jardineria";
import PlantasElectricas from "./routes/plantasElectricas";
import Seguridad from "./routes/seguridad";
import Login from "./routes/login";
import Registro from "./routes/registro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "plantasElectricas/",
        element: <PlantasElectricas />,
      },
      {
        path: "seguridad/",
        element: <Seguridad />,
      },
      {
        path: "jardineria/",
        element: <Jardineria />,
      },
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "registro/",
        element: <Registro />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);