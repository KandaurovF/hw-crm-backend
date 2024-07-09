import { Schema, model, Types } from "mongoose";
import Joi from "joi";

const saleSchema = new Schema(
  {
    companyId: {
      type: Types.ObjectId,
      required: true,
      ref: "company",
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
