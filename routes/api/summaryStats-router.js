import express from "express";
import summaryStatsController from "../../controllers/summaryStats-controller.js";

const summaryStatsRouter = express.Router();

summaryStatsRouter.get("/", summaryStatsController.getSummaryStats);

export default summaryStatsRouter;
