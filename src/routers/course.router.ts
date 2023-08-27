import { Router } from "express";
import middlewares from "../middlewares";
import { couseCreateSchema } from "../schemas";
import { courseController } from "../controllers";

const courseRouter: Router = Router()

courseRouter.post(
    "", middlewares.validateBody(couseCreateSchema),
    middlewares.verifyToken, middlewares.verifyUserPermission,
    courseController.create
)

courseRouter.get("", courseController.read)
courseRouter.post("/:courseId/users/:userId", middlewares.verifyToken, middlewares.verifyUserPermission, courseController.enrollCurse)
courseRouter.delete("/:courseId/users/:userId", middlewares.verifyToken, middlewares.verifyUserPermission, courseController.deleteUserFromCourse)
export default courseRouter