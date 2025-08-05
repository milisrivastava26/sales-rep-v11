import "./App.css";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import { getRoutes } from "./util/AllRoutesNew";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


function App() {
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const routes = getRoutes(userDetails);
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
