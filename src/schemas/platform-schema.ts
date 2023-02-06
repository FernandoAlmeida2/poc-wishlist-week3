import Joi from "joi";

export const platformSchema = Joi.object({
  name: Joi.string().required(),
});
