import express from "express";
import restaurantRouter from "./api/v1/RestaurantRouter.js";
import reviewsRouter from "./api/v1/ReviewsRouter.js";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import votesRouter from "./api/v1/VotesRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/restaurants", restaurantRouter);
rootRouter.use("/api/v1/reviews", reviewsRouter);
rootRouter.use("/api/v1/votes", votesRouter);


export default rootRouter;
