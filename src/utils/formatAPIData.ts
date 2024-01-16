import { APIPlayer, APIMeta } from '../players/interfaces/api.interfaces';
import {  Player, Metadata, PlayersRecord } from '../players/interfaces/interface';

export const formatAPIPlayers = (players: APIPlayer[]): PlayersRecord => {
    const formattedPlayersObj: Record<string, Player> = {};
    players.map((player) => {
      formattedPlayersObj[String(player.id)] = {
        id: String(player.id),
        fullName: `${player.first_name} ${player.last_name}`,
        team: player.team.name,
        height: player.height_feet || player.height_inches || 'N/A',
        position: player.position || 'N/A',
      };
    });
    return formattedPlayersObj;
  };
  
export const formatMeta = (meta: APIMeta): Metadata => {
  return {
    totalPages: meta.total_pages,
    currentPage: meta.current_page,
    perPage: meta.per_page,
    totalCount: meta.total_count,
  };
};
