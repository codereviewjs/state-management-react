import express from "express";
import authRoute from "./auth.route";
import reportRoute from "./report.route";
import reporterRoute from "./reporter.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/report",
    route: reportRoute,
  },
  {
    path: "/reporter",
    route: reporterRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
