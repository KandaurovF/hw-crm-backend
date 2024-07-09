import { ctrlWrapper } from "../decorators/index.js";
import Company from "../models/Company.js";

const getAllCities = async (req, res) => {
  const result = await Company.aggregate([
    {
      $lookup: {
        from: "cities",
        localField: "cityId",
        foreignField: "_id",
        as: "cityInfo",
      },
    },
    {
      $unwind: "$cityInfo",
    },
    {
      $lookup: {
        from: "countries",
        localField: "countryId",
        foreignField: "_id",
        as: "countryInfo",
      },
    },
    {
      $unwind: "$countryInfo",
    },
    {
      $group: {
        _id: {
          cityId: "$cityId",
          cityTitle: "$cityInfo.title",
          countryTitle: "$countryInfo.title",
        },
        companyTitles: { $push: "$title" },
        companyCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: "$_id.cityId",
        title: "$_id.cityTitle",
        countryTitle: "$_id.countryTitle",
        companyTitles: 1,
        companyCount: 1,
      },
    },
  ]);

  const formattedResult = result.map((item) => ({
    _id: item._id,
    title: item.title,
    countryTitle: item.countryTitle,
    companyTitles: item.companyTitles,
    companyCount: item.companyCount,
  }));

  res.json(formattedResult);
};

export default { getAllCities: ctrlWrapper(getAllCities) };
