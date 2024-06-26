import express from "express";
import promotionsController from "../../controllers/promotions-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  promotionAddSchema,
  //companyUpdateFavoriteSchema,
} from "../../models/Promotion.js";

const promotionAddValidate = validateBody(promotionAddSchema);
// const promotionUpdateFavoriteValidate = validateBody(promotionUpdateFavoriteSchema);

const promotionsRouter = express.Router();

promotionsRouter.get("/", promotionsController.getAll);

promotionsRouter.get("/:id", isValidId, promotionsController.getById);

promotionsRouter.post(
  "/",
  isEmptyBody,
  promotionAddValidate,
  promotionsController.add
);

// promotionsRouter.put(
//   "/:id",
//   isValidId,
//   isEmptyBody,
//   companyAddValidate,
//   promotionsController.updateById
// );

// promotionsRouter.patch(
//   "/:id/favorite",
//   isValidId,
//   isEmptyBody,
//   moviUpdateFavoriteValidate,
//   promotionsController.updateFavorite
// );

// promotionsRouter.delete("/:id", isValidId, promotionsController.deleteById);

export default promotionsRouter;
