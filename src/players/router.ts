import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';
import { getManyReqSchema } from './schema';
import ValidateRequest from '../utils/joi';
import ControllerName from './controller';

const playersRouter = Router();

playersRouter.get('/', ValidateRequest(getManyReqSchema), wrapAsync(ControllerName.getMany));

export default playersRouter;
