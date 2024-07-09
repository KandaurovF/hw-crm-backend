import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import Promotion from "../models/Promotion.js";

const getAll = async (req, res) => {
  const result = await Promotion.find().populate("companyId", "title");

  const formattedPromotions = result.map((promotion) => ({
    _id: promotion._id,
    title: promotion.title,
    description: promotion.description,
    discount: promotion.discount,
    companyId: promotion.companyId._id,
    companyTitle: promotion.companyId.title,
    avatar: promotion.avatar,
  }));
  res.json(formattedPromotions);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Promotion.findById(id);
  if (!result) {
    throw HttpError(404, `Promotion with ${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Promotion.create(req.body);
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
};
