import { useRoutes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Blog from "./Pages/Blog/Blog";

const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <Home />,
         },
         { 
            path: "blog", 
            element: <Blog /> 
        },
        {
            path: "*", element: <NotFound />,
        },
    ])
}

export default Router;