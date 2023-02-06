import { Request, Response } from "express";
import rankingService from "../services/ranking-service";

export async function getRankingByGenre(req: Request, res: Response): Promise<void> {
  const ranking = await rankingService.rankingByGenre();
  res.status(200).send(ranking);
}

export async function getRankingByPlatform(req: Request, res: Response): Promise<void> {
  const ranking = await rankingService.rankingByPlatform();
  res.status(200).send(ranking);
}