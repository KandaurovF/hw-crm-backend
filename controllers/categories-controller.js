import { ctrlWrapper } from "../decorators/index.js";
import Company from "../models/Company.js";

const getAllCategories = async (req, res) => {
  const result = await Company.aggregate([
    {
      $group: {
        _id: {
          categoryId: "$categoryId",
          categoryTitle: "$categoryTitle",
        },
        companyCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        categoryId: "$_id.categoryId",
        categoryTitle: "$_id.categoryTitle",
        companyCount: 1,
      },
    },
  ]);
  res.json(result);
};

export default { getAllCategories: ctrlWrapper(getAllCategories) };
