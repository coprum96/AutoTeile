import { useRoutes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";

const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <Home />,
         },
        {
            path: "*", element: <NotFound />,
        }
    ])
}

export default Router;