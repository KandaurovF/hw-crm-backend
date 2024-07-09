import { Schema, model, Types } from "mongoose";
import Joi from "joi";

const citySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    countryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "country",
    },
  },
  { versionKey: false, timestamps: true }
);

export const cityAddSchema = Joi.object({
  title: Joi.string().required(),
  countryId: Joi.string().required(),
});

const City = model("city", citySchema);

export default City;
