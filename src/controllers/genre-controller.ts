import { Genre } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import genreService from "../services/genre-service";

export async function getAllGenres(req: Request, res: Response): Promise<void> {
  const genres: Genre[] = await genreService.getAllGenres();
  res.status(200).send(genres);
}

export async function postGenre(req: Request, res: Response): Promise<void> {
  const { name } = req.body as Genre;

  try {
    await genreService.insertGenre(name);
    res.status(httpStatus.CREATED).send("genre successfully inserted!");
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      res.status(httpStatus.CONFLICT).send(error);
    }
  }
}

export async function updateGenre(req: Request, res: Response): Promise<void> {
  const { name: newName } = req.body as Genre;
  const { id } = req.params;

  try {
    await genreService.updateGenre(newName, Number(id));
    res.status(httpStatus.OK).send("genre successfully updated!");
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "DuplicatedNameError") {
      res.status(httpStatus.CONFLICT).send(error);
    }
  }
}
