import { Router } from "express";
import { userCreateSchema } from "../schemas";
import { uniqueEmail } from "../middlewares/uniqueEmail.middleware";
import { userControllers } from "../controllers";
import middlewares from "../middlewares";

const userRouter: Router = Router()

userRouter.post("", middlewares.validateBody(userCreateSchema), uniqueEmail, userControllers.create)
userRouter.get("", middlewares.verifyToken, middlewares.verifyUserPermission,userControllers.read)
userRouter.get("/:id/courses", middlewares.verifyToken, middlewares.verifyUserPermission, userControllers.listCourseUser)


export default userRouter