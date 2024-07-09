import express from "express";
import citiesController from "../../controllers/cities-controller.js";

const citiesRouter = express.Router();

citiesRouter.get("/", citiesController.getAllCities);

export default citiesRouter;
