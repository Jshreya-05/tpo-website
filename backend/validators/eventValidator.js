import Joi from 'joi';

export const validateEvent = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    companyName: Joi.string().required(),
    description: Joi.string().required(),
    googleFormLink: Joi.string().allow('').optional(),
    registrationLink: Joi.string().allow('').optional(),
    eligibilityCriteria: Joi.string().required(),
    eventDate: Joi.date().required(),
    deadline: Joi.date().required(),
    status: Joi.string().valid('draft', 'published', 'archived').default('published'),
    image: Joi.any().optional(), // For multer handling
    existingImage: Joi.any().optional()
  });

  return schema.validate(data, { abortEarly: false });
};
