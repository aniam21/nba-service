import { GetPlayersQuery } from '../../players/interfaces/interface';
import { APIResponse } from '../../players/interfaces/api.interfaces';
import { HttpClient } from '../clients/http.client';

export default class PlayersService {
  static async getPlayers(query: GetPlayersQuery, search = ''): Promise<APIResponse> {
    let url = "https://www.balldontlie.io/api/v1/players";
    if (search.length > 0) {
      url = `${url}?search=${search}`;
    }
    const response = await HttpClient.get<APIResponse>(url, {
    ...query,
    per_page: query.perPage,
    page: query.page,
  });
    
    return response;
  }

}
