import express from "express";
import countriesController from "../../controllers/countries-controller.js";
import companiesRouter from "./companies-router.js";

const countriesRouter = express.Router();

countriesRouter.get("/", countriesController.getAllCountries);

export default countriesRouter;
