import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError } from "./hooks.js";

const companyStatus = ["active", "notActive", "pending", "suspended"];

const companySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: companyStatus,
      required: true,
    },
    joinedDate: {
      type: Date,
      required: true,
    },
    hasPromotions: {
      type: Boolean,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    categoryTitle: {
      type: String,
      required: true,
    },
    countryId: {
      type: String,
      required: true,
    },
    countryTitle: {
      type: String,
      required: true,
    },
    city: {
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

companySchema.post("save", handleSaveError);

export const companyAddSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string()
    .valid(...companyStatus)
    .required(),
  joinedDate: Joi.date().required(),
  hasPromotions: Joi.boolean().required(),
  categoryId: Joi.string().required(),
  categoryTitle: Joi.string().required(),
  countryId: Joi.string().required(),
  countryTitle: Joi.string().required(),
  city: Joi.string().required(),
  avatar: Joi.string().uri().default(""),
});

const Company = model("company", companySchema);

export default Company;
