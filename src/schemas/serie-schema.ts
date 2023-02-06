import Joi from "joi";

export const createSerieSchema = Joi.object({
  name: Joi.string().required(),
  platform: Joi.string().required(),
  genre: Joi.string().required(),
});

export const updateSerieSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().valid("ongoing", "finished").required(),
  review: Joi.string(),
  rate: Joi.number().min(1).max(5),
});
