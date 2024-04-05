import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GroupsPage } from "./pages/groups";

const routes = [{ path: "/groups", element: <GroupsPage /> }];
const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export { App };
