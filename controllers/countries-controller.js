import { ctrlWrapper } from "../decorators/index.js";
import Company from "../models/Company.js";

const getAllCountries = async (req, res) => {
  const result = await Company.aggregate([
    {
      $group: {
        _id: "$countryId",

        companyCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "countries",
        localField: "_id",
        foreignField: "_id",
        as: "countryInfo",
      },
    },
    {
      $unwind: "$countryInfo",
    },
    {
      $project: {
        _id: 0,
        countryId: "$_id.countryId",
        countryTitle: "$countryInfo.title",

        companyCount: 1,
      },
    },
  ]);
  res.json(result);
};

export default { getAllCountries: ctrlWrapper(getAllCountries) };
