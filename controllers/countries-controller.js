import { ctrlWrapper } from "../decorators/index.js";
import Company from "../models/Company.js";

const getAllCountries = async (req, res) => {
  const result = await Company.aggregate([
    {
      $group: {
        _id: {
          countryId: "$countryId",
          countryTitle: "$countryTitle",
          city: "$city",
        },
        companyCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        countryId: "$_id.countryId",
        countryTitle: "$_id.countryTitle",
        city: "$_id.city",
        companyCount: 1,
      },
    },
  ]);
  res.json(result);
};

export default { getAllCountries: ctrlWrapper(getAllCountries) };
