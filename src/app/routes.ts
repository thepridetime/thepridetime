import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import { Category } from "./pages/Category";
import { Markets } from "./pages/Markets";
import { Search } from "./pages/Search";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "article/:id", Component: Article },
      { path: "category/:slug", Component: Category },
      { path: "category/:slug/:sub", Component: Category },
      { path: "region/:slug", Component: Category },
      { path: "markets", Component: Markets },
      { path: "search", Component: Search },
      { path: "reports", Component: Home },
      { path: "latest", Component: Home },
      { path: "subscribe", Component: Home },
      { path: "newsletter", Component: Home },
      { path: "signin", Component: Home },
      { path: "*", Component: NotFound },
    ],
  },
]);
