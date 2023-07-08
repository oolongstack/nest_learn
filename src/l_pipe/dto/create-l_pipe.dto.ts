import * as Joi from 'joi';

export const createLPipeSchema = Joi.object({
  name: Joi.string().min(3).max(10).required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});

export class CreateLPipeDto {}
