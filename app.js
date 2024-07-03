import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

import companiesRouter from "./routes/api/companies-router.js";
import promotionsRouter from "./routes/api/promotions-router.js";
import salesRouter from "./routes/api/sales-router.js";
import categoriesRouter from "./routes/api/categories-router.js";
import summaryStatsRouter from "./routes/api/summaryStats-router.js";
import countriesRouter from "./routes/api/countries-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/companies", companiesRouter);
app.use("/api/promotions", promotionsRouter);
app.use("/api/sales", salesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/summary-stats", summaryStatsRouter);
app.use("/api/countries", countriesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
