import { Schema, model } from "mongoose";
import Joi from "joi";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const categoryAddSchema = Joi.object({
  title: Joi.string().required(),
});

const Category = model("category", categorySchema);

export default Category;
