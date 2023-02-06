import { Genre } from "@prisma/client";
import genreRepository from "../repositories/genre-repository";
import { duplicatedNameError, notFoundError } from "./errors";

async function getAllGenres(): Promise<Genre[]> {
  const genres: Genre[] = await genreRepository.findMany();
  return genres;
}

async function insertGenre(newGenre: string): Promise<void> {
  const alreadyExists: Genre = await genreRepository.findByName(newGenre);

  if (alreadyExists) {
    throw duplicatedNameError("genre");
  }


  await genreRepository.insertOne(newGenre);
}


async function updateGenre(updateName: string, genreId: number): Promise<void> {
  const nameAlreadyExists: Genre= await genreRepository.findByName(updateName);
  if (nameAlreadyExists) {
    throw duplicatedNameError("genre");
  }
  const genreExists: Genre = await genreRepository.findById(genreId);

  if (!genreExists) {
    throw notFoundError("genre");
  }

  await genreRepository.updateOne(genreId, updateName);
}

const genreService = {
  getAllGenres,
  insertGenre,
  updateGenre,
};

export default genreService;
