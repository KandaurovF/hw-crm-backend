import express from "express";
import salesController from "../../controllers/sales-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
// import { validateBody } from "../../decorators/index.js";

const salesRouter = express.Router();

salesRouter.get("/summary", salesController.getSummary);

salesRouter.get("/:id", isValidId, salesController.getById);

salesRouter.get(
  "/company/:companyId",
  isValidId,
  salesController.getByCompanyId
);

export default salesRouter;
