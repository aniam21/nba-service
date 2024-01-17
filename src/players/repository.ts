import { RedisClient } from '../utils/clients/redis.client';

export default class PlayersRepository {
  static async isCached<T>(cachKey: string): Promise<{ isCached: boolean; result: T }> {
    let result;
    let isCached = false;
    const isCahedInRedis = await RedisClient.get(cachKey);
    if (isCahedInRedis) {
      isCached = true;
      result = JSON.parse(isCahedInRedis);
    }
    return { isCached, result };
  }
  static async cachePlayers<T>(cachKey, players: T): Promise<void> {
    await RedisClient.set(cachKey, JSON.stringify(players));
  }
}
