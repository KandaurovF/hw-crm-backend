import express from "express";
import companiesController from "../../controllers/companies-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  companyAddSchema,
  // companyUpdateFavoriteSchema,
} from "../../models/Company.js";

const companyAddValidate = validateBody(companyAddSchema);
// const companyUpdateFavoriteValidate = validateBody(companyUpdateFavoriteSchema);

const companiesRouter = express.Router();

companiesRouter.get("/", companiesController.getAll);

companiesRouter.get("/:id", isValidId, companiesController.getById);

companiesRouter.post(
  "/",
  isEmptyBody,
  companyAddValidate,
  companiesController.add
);

// companiesRouter.put(
//   "/:id",
//   isValidId,
//   isEmptyBody,
//   companyAddValidate,
//   companiesController.updateById
// );

// companiesRouter.patch(
//   "/:id/favorite",
//   isValidId,
//   isEmptyBody,
//   companyUpdateFavoriteValidate,
//   companiesController.updateFavorite
// );

// companiesRouter.delete("/:id", isValidId, companiesController.deleteById);

export default companiesRouter;
