import { Request, Response } from 'express';
import PlayersManager from './manager';
import { GetPlayersQuery } from './interfaces/interface';

export default class PlayersController {
  static async getMany(req: Request, res: Response): Promise<void> {
    const players = await PlayersManager.getMany(req.query as unknown as GetPlayersQuery);
    res.json(players);
  }
}
