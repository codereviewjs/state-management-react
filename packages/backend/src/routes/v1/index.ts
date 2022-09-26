import express from "express";
import authRoute from "./auth.route";
import bookRoute from "./book.route";
import authorRoute from "./author.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/book",
    route: bookRoute,
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
