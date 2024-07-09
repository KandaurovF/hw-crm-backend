import { ctrlWrapper } from "../decorators/index.js";
import Company from "../models/Company.js";

const getAllCategories = async (req, res) => {
  const result = await Company.aggregate([
    {
      $group: {
        _id: "$categoryId",

        companyCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: "$categoryInfo",
    },
    {
      $project: {
        _id: 0,
        categoryId: "$categoryInfo._id",
        categoryTitle: "$categoryInfo.title",
        companyCount: 1,
      },
    },
  ]);
  res.json(result);
};

export default { getAllCategories: ctrlWrapper(getAllCategories) };
