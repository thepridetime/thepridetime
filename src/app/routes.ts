import { createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import { Category } from "./pages/Category";
import { Markets } from "./pages/Markets";
import { Search } from "./pages/Search";
import { NotFound } from "./pages/NotFound";
import { Subscribe } from "./pages/Subscribe";
import { SignIn } from "./pages/SignIn";
import { Signup } from "./pages/Signup";
import { Newsletter } from "./pages/Newsletter";
import { Magazine } from "./pages/Magazine";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { CookiePolicy } from "./pages/CookiePolicy";
import { Accessibility } from "./pages/Accessibility";
import { Reports } from "./pages/Reports";

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
      { path: "magazine", Component: Magazine },
      { path: "reports", Component: Reports },
      { path: "subscribe", Component: Subscribe },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: Signup },
      { path: "newsletter", Component: Newsletter },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
      { path: "cookie-policy", Component: CookiePolicy },
      { path: "accessibility", Component: Accessibility },
      { path: "latest", Component: Home },
      { path: "*", Component: NotFound },
    ],
  },
]);
