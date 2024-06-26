import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Company from "../models/Company.js";

const getAll = async (req, res) => {
  const result = await Company.find();
  res.json(result);
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
  const result = await Company.create(req.body);
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
};
