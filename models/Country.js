import { Schema, model } from "mongoose";
import Joi from "joi";

const countrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const countryAddSchema = Joi.object({
  title: Joi.string().required(),
});

const Country = model("country", countrySchema);

export default Country;
