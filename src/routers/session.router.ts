import { Router } from "express";
import middlewares from "../middlewares";
import { sessionCreate } from "../schemas";
import { sessionControllers } from "../controllers";

const sesseionRouter: Router = Router()

sesseionRouter.post("", middlewares.validateBody(sessionCreate),
 sessionControllers.create);

export default sesseionRouter;