import { GetPlayersQuery, PlayerResponse } from './interfaces/interface';
import { APIMeta } from './interfaces/api.interfaces';
import PlayerService from '../utils/services/players.service';
import { PageNotFound } from '../utils/errors/errors';
import {  formatAPIPlayers, formatMeta } from '../utils/formatAPIData';
import PlayersRepository from './repository';

export default class PlayersManager {
  private static validatePlayersResponse({ total_pages, current_page }: APIMeta): void {
    if (current_page > total_pages && total_pages !== 0) {
      throw new PageNotFound();
    }
  }

  static async getMany(query: GetPlayersQuery): Promise<PlayerResponse> {
    let cacheKey = `${query.page}_${query.perPage}1`;
    if (query.search?.length) {
      cacheKey = `${query.search}_${cacheKey}`;
    }
    const { isCached, result } = await PlayersRepository.isCached<PlayerResponse>(cacheKey);
    if (isCached) {
      return result;
    }
    const { search, ...pagingData } = query;
    const apiResponse = await PlayerService.getPlayers(pagingData, search);
    this.validatePlayersResponse(apiResponse.meta);
    const players = formatAPIPlayers(apiResponse.data);
    const metadata = formatMeta(apiResponse.meta);
    const response: PlayerResponse = {
      data: players,
      metadata,
    };
    await PlayersRepository.cachePlayers(cacheKey, response);
    return response;
  }
}
