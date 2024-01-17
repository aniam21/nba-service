import Joi from 'joi';
import config from '../config';

const { PLAYERS_PER_PAGE, DEFAULT_PAGE } = config.redis;

export const getManyReqSchema = Joi.object({
  query: Joi.object({
    page: Joi.number().default(DEFAULT_PAGE).min(1),
    perPage: Joi.number().default(PLAYERS_PER_PAGE).min(1).max(100),
    search: Joi.string().regex(/^[a-zA-Z0-9]{2,20}$/),
  }),
});
