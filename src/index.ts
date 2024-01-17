import { logger } from './utils/logger/logger';
import { SeverityLevel } from './utils/logger/severityLevel';
import Server from './server';
import config from './config';
import { redisClient } from './utils/clients/redis.client';

const startRedis = async () => {
  await redisClient.connect();
  logger.log(SeverityLevel.Informational, '[REDIS] connected');

  redisClient.on('error', (error) => {
    logger.log(SeverityLevel.Error, '[REDIS] error', { error });
  });
  redisClient.on('end', () => {
    logger.log(SeverityLevel.Informational, '[REDIS] end');
  });
  redisClient.on('reconnecting', () => {
    logger.log(SeverityLevel.Informational, '[REDIS] reconnecting...');
  });
  redisClient.on('warning', (warning) => {
    logger.log(SeverityLevel.Warning, '[REDIS] warning', { warning });
  });
};
(async (): Promise<void> => {
  logger.log(SeverityLevel.Informational, `Starting ${config.server.name}`);
  await startRedis();
  Server.startServer();
})();

process
  .on('unhandledRejection', (reason, p) => {
    logger.log(SeverityLevel.Emergency, `Unhandled Rejection at ${JSON.stringify(p)}`, { reason });
    process.exit(1);
  })
  .on('uncaughtException', (err) => {
    logger.log(SeverityLevel.Emergency, 'Uncaught Exception thrown', err);
    process.exit(1);
  })
  .on('SIGINT', () => {
    logger.log(SeverityLevel.Informational, 'User Termination');
    process.exit(0);
  });
