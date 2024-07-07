import Joi from 'joi';

const schema = Joi.object({
  total: Joi.number().min(1).required(),
  description: Joi.string().trim().min(5).max(300).required(),
  ownerUserId: Joi.number().min(1).required(),
  groupId: Joi.number().min(1).required(),
});

export default schema;
