import { Schema, model } from "mongoose";
import Joi from "joi";

const saleSchema = new Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const saleAddSchema = Joi.object({
  companyId: Joi.string().required(),
  sold: Joi.number().required(),
  income: Joi.number().required(),
  date: Joi.date().required(),
});

const Sale = model("sale", saleSchema);

export default Sale;
