import { Router } from "express";
import { getAllplatforms, postPlatform, updatePlatform } from "../controllers/platform-controller";
import { validateBody } from "../middlewares/validateMiddleware";
import { platformSchema } from "../schemas/platform-schema";

const platformRouter: Router = Router();

platformRouter.get("/platforms", getAllplatforms);
platformRouter.post("/platforms", validateBody(platformSchema), postPlatform);
platformRouter.put("/platforms/:id", validateBody(platformSchema), updatePlatform);

export default platformRouter;