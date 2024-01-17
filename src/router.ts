import { Router } from 'express';
import nameRouter from './players/router';
import config from './config';

const AppRouter = Router();
const { endpoint } = config.server;
AppRouter.use(endpoint, nameRouter);

AppRouter.use('/is-alive', (_req, res) => {
  res.status(200).send('alive');
});

AppRouter.use('*', (_req, res) => {
  res.status(404).send('Invalid Route');
});

export default AppRouter;
