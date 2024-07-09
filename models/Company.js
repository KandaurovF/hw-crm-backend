import { Schema, model, Types } from "mongoose";
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    countryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "country",
    },
    cityId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "city",
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
  categoryTitle: Joi.string().required(),
  countryTitle: Joi.string().required(),
  cityTitle: Joi.string().required(),
  avatar: Joi.string().uri().allow("").default(""),
});

const Company = model("company", companySchema);

export default Company;
