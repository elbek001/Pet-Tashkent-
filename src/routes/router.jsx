import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import MainPage from "../pages/MainPage";
import Blog from "../pages/Blog";
import NotFound from "../pages/NotFound";
import Categories from "../pages/Categories";
import CategoryDetails from "../pages/CategoryDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/:id", element: <CategoryDetails /> },
      { path: "blog", element: <Blog /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
