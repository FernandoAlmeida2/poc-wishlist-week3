import { Platform } from "@prisma/client";
import platformRepository from "../repositories/platform-repository";
import { duplicatedNameError, notFoundError } from "./errors";

async function getAllPlatforms(): Promise<Platform[]> {
  const platforms: Platform[] = await platformRepository.findMany();
  return platforms;
}

async function insertPlatform(newPlatform: string): Promise<void> {
  const alreadyExists: Platform = await platformRepository.findByName(newPlatform);

  if (alreadyExists) {
    throw duplicatedNameError("platform");
  }

  await platformRepository.insertOne(newPlatform);
}

async function updatePlatform(
  updateName: string,
  platformId: number
): Promise<void> {
  const nameAlreadyExists: Platform = await platformRepository.findByName(updateName);

  if (nameAlreadyExists) {
    throw duplicatedNameError("platform");
  }
  const platformExists: Platform = await platformRepository.findById(platformId);

  if (!platformExists) {
    throw notFoundError("platform");
  }

  await platformRepository.updateOne(platformId, updateName);
}

const platformService = {
  getAllPlatforms,
  insertPlatform,
  updatePlatform,
};

export default platformService;
