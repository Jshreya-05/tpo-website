import Joi from 'joi';
import { PROGRAM_DEPARTMENT_SLUGS } from '../constants/departments.js';

const listField = Joi.alternatives().try(
  Joi.array().items(Joi.string().allow('')),
  Joi.string().allow('')
);

export const validateProgram = (data) => {
  const schema = Joi.object({
    slug: Joi.string().trim().lowercase().allow('').optional(),
    title: Joi.string().trim().required(),
    shortDesc: Joi.string().trim().required(),
    description: Joi.string().required(),
    tag: Joi.string().trim().allow('').optional(),
    tagColor: Joi.string().allow('').optional(),
    tagTextColor: Joi.string().allow('').optional(),
    icon: Joi.string().allow('').optional(),
    gradient: Joi.string().allow('').optional(),
    students: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
    duration: Joi.string().trim().required(),
    topics: listField.optional(),
    benefits: listField.optional(),
    url: Joi.string().uri().allow('').optional(),
    department: Joi.string().valid(...PROGRAM_DEPARTMENT_SLUGS).required(),
    status: Joi.string().valid('draft', 'published').default('published'),
    sortOrder: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  });

  return schema.validate(data, { abortEarly: false });
};
