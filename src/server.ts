import http from 'http';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { logger } from './utils/logger/logger';
import { SeverityLevel } from './utils/logger/severityLevel';
import config from './config';
import AppRouter from './router';
import { errorMiddleware } from './utils/errors/errorHandler';
import cors from 'cors';
import { redisClient } from './utils/clients/redis.client';

export default class Server {
  public app: express.Application;

  private server: http.Server;

  public static startServer(): Server {
    return new Server();
  }

  public closeServer(): void {
    redisClient.quit();
    redisClient.on('end', () => {
      logger.log(SeverityLevel.Informational, 'Redis connection closed');
    }
    );
    this.server.close();
  }
  private static setHeaders = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');

    return next();
  };

  private constructor() {
    this.app = express();
    this.configurationMiddleware();
    this.app.use(AppRouter);
    this.app.use(errorMiddleware);
    this.server = this.app.listen(config.server.port, () => {
      logger.log(SeverityLevel.Informational, `${config.server.name} listening on port ${config.server.port}`);
    });
  }

  private configurationMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(Server.setHeaders);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}
