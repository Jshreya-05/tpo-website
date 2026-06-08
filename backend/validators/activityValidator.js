import Joi from 'joi';

export const validateActivity = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().valid('Placement Drive', 'Workshop', 'Seminar', 'Bootcamp', 'Guest Lecture').required(),
    year: Joi.number().required(),
    eventDate: Joi.date().required(),
    description: Joi.string().required(),
    companyName: Joi.string().allow('').optional(),
    isFeatured: Joi.boolean().optional(),
    status: Joi.string().valid('draft', 'published', 'archived').default('published'),
    images: Joi.any().optional(), // For multer handling
    existingImages: Joi.any().optional()
  });

  return schema.validate(data, { abortEarly: false });
};

