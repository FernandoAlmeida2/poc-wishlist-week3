import { Platform } from "@prisma/client";
import { Request, Response } from "express";
import platformService from "../services/platform-service";

export async function getAllplatforms(
  req: Request,
  res: Response
): Promise<void> {
  const platforms: Platform[] = await platformService.getAllPlatforms();
  res.status(200).send(platforms);
}

export async function postPlatform(req: Request, res: Response): Promise<void> {
  const { name } = req.body as Platform;

  try {
    await platformService.insertPlatform(name);
    res.status(201).send("platform successfully inserted!");
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      res.status(409).send(error);
    }
  }
}

export async function updatePlatform(
  req: Request,
  res: Response
): Promise<void> {
  const { name: newName } = req.body as Platform;
  const { id } = req.params;

  try {
    await platformService.updatePlatform(newName, Number(id));
    res.status(200).send("platform successfully updated!");
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.status(404).send(error);
    }
    if (error.name === "DuplicatedNameError") {
      res.status(409).send(error);
    }
  }
}
