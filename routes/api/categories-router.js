import express from "express";
import categoriesController from "../../controllers/categories-controller.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

export default categoriesRouter;
