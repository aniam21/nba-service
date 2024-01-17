import * as env from 'env-var';

export default {
  server: {
    name: 'nba-api',
    port: env.get('APPLICATION_PORT').default(3000).asPortNumber(),
    endpoint: env.get('APPLICATION_ENDPOINT').default('/api/players').asString(),
  },
  redis: {
    
    host: env.get('REDIS_HOST').default('localhost').asString(),
    port: env.get('REDIS_PORT').default(6379).asPortNumber(),
    password: env.get('REDIS_PASSWORD').default('').asString(),
    EXPIRE_TIME: env.get('REDIS_EXPIRE_TIME').default(10 * 60).asInt(),
    PLAYERS_PER_PAGE: env.get('PLAYERS_PER_PAGE').default(25).asInt(),
    DEFAULT_PAGE: env.get('DEFAULT_PAGE').default(1).asInt(),
  },
};
