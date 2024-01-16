
export interface Player {
  id: string;
  fullName: string;
  team: string;
  height: number | string;
  position: string;
}

export type PlayersRecord = Record<string, Player>;

export type PlayerResponse = {
  data: PlayersRecord;
  metadata: Metadata
};

export interface Metadata {
  nextPage: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  totalCount: number;
}

export interface GetPlayersQuery {
  page: number;
  perPage: number;
  search?: string;
}
