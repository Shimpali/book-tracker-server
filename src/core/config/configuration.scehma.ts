import { Joi } from 'celebrate';

export const configurationSchema = Joi.object({
  APP_NAME: Joi.required(),
  APP_VERSION: Joi.required(),
  APP_DESCRIPTION: Joi.required(),
  APP_SCHEMA: Joi.required(),
  APP_HOST: Joi.required(),
  PORT: Joi.optional(),
  APP_ENV: Joi.required().valid('prod', 'uat', 'qa', 'dev', 'local'),

  AUTH_JWT: Joi.required(),
  AUTH_JWT_EXPIRY: Joi.required(),
  AUTH_MAGIC_LINK_JWT_EXPIRY: Joi.required(),
  AUTH_REFRESH_JWT: Joi.required(),
  AUTH_REFRESH_JWT_EXPIRY: Joi.required(),

  DATABASE_URL: Joi.required(),
});
