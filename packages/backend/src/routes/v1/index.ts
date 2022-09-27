import express from "express";
import authRoute from "./auth.route";
import themeRoute from "./theme.route";
import authorRoute from "./author.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/theme",
    route: themeRoute,
  },
  {
    path: "/author",
    route: authorRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
