import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Company from "../models/Company.js";
import Category from "../models/Category.js";
import Country from "../models/Country.js";
import City from "../models/City.js";

const getAll = async (req, res) => {
  const result = await Company.find()
    .populate("categoryId", "title")
    .populate("countryId", "title")
    .populate("cityId", "title");

  console.log("Result from database:", result);

  const formattedCompanies = result.map((company) => ({
    id: company._id,
    title: company.title,
    description: company.description,
    status: company.status,
    joinedDate: company.joinedDate,
    hasPromotions: company.hasPromotions,
    categoryId: company.categoryId ? company.categoryId._id : null,
    categoryTitle: company.categoryId ? company.categoryId.title : null,
    countryId: company.countryId ? company.countryId._id : null,
    countryTitle: company.countryId ? company.countryId.title : null,
    cityId: company.cityId ? company.cityId._id : null,
    cityTitle: company.cityId ? company.cityId.title : null,
    avatar: company.avatar,
  }));

  console.log("Formatted companies:", formattedCompanies);

  res.json(formattedCompanies);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Company.findById(id);
  if (!result) {
    throw HttpError(404, `Company with ${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const {
    title,
    description,
    status,
    joinedDate,
    hasPromotions,
    categoryTitle,
    countryTitle,
    cityTitle,
    avatar,
  } = req.body;

  // Find or create category
  const category = await Category.findOneAndUpdate(
    { title: categoryTitle },
    { title: categoryTitle },
    { upsert: true, new: true }
  );

  // Find or create country
  const country = await Country.findOneAndUpdate(
    { title: countryTitle },
    { title: countryTitle },
    { upsert: true, new: true }
  );

  // Find or create city
  const city = await City.findOneAndUpdate(
    { title: cityTitle, countryId: country._id },
    { title: cityTitle, countryId: country._id },
    { upsert: true, new: true }
  );

  const newCompany = {
    title,
    description,
    status,
    joinedDate,
    hasPromotions,
    categoryId: category._id,
    countryId: country._id,
    cityId: city._id,
    avatar,
  };

  const result = await Company.create(newCompany);
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
};
