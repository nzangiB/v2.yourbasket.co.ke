import { defaults, Router } from "@wearearchangel/handcrafted";

// plugins
import { reportWebVitals } from "../plugins/reportWebVitals";
import { updateViewport } from "../plugins/updateViewport";

// routes
import Home from "../pages/home/home";
import Products from "../pages/products";
import Account from "../pages/account/account";
import Support from "../pages/support/support";
import Login from "../pages/login";
import Register from "../pages/register";
import Fallback from "../pages/fallback";
import Error from "../pages/error";

// initialize defaults
defaults.templateEngine = "react";
defaults.hash = "#";
defaults.useHash = true;

const routes = [
  ...Home,
  ...Products,
  ...Account,
  ...Login,
  ...Register,
  ...Support,
  ...Fallback,
  ...Error
];

Router(routes).then(() => {
  addEventListener("load", reportWebVitals, false);
  addEventListener("load", updateViewport, false);
  addEventListener("resize", updateViewport, false);
  addEventListener("orientationchange", updateViewport, false);
});
