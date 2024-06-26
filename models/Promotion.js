import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError } from "./hooks.js";

const promotionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    companyTitle: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

promotionSchema.post("save", handleSaveError);

export const promotionAddSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  discount: Joi.number().required(),
  companyId: Joi.string().required(),
  companyTitle: Joi.string().required(),
  avatar: Joi.string().uri().default(""),
});

const Promotion = model("promotion", promotionSchema);

export default Promotion;
