import mongoose from "mongoose";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Sale from "../models/Sale.js";

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Sale.findById(id);
  if (!result) {
    throw HttpError(404, `Sale with ${id} not found`);
  }
  res.json(result);
};

const getByCompanyId = async (req, res) => {
  const { companyId } = req.params;
  const result = await Sale.find({ companyId });
  if (!result || result.length === 0) {
    throw HttpError(404, `No sales of this company found`);
  }
  res.json(result);
};

const getSummary = async (req, res) => {
  try {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: "$companyId",
          totalSold: { $sum: "$sold" },
          totalIncome: { $sum: "$income" },
        },
      },
      {
        $addFields: {
          companyId: "$_id",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $project: {
          _id: 0,
          companyId: "$companyId",
          companyTitle: { $ifNull: ["$company.title", "Unknown"] },
          totalSold: 1,
          totalIncome: 1,
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw HttpError(404, "No sales data found");
    }

    res.json(result);
  } catch (error) {
    console.error("Error during aggregation:", error);
    res.status(500).json({ message: "Server error during aggregation" });
  }
};

export default {
  getById: ctrlWrapper(getById),
  getByCompanyId: ctrlWrapper(getByCompanyId),
  getSummary: ctrlWrapper(getSummary),
};
