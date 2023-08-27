import { Request, Response } from "express";
import { CourseRead, User, UserRead, UserReturn } from "../interfaces";
import { userServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await userServices.create(req.body);
    return res.status(201).json(user);
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const users: UserRead = await userServices.read();
    return res.status(200).json(users);
  };

  const listCourseUser = async (req: Request, res: Response): Promise<Response> => {
    const userCourses = await userServices.listCourseUser(
      res.locals.decoded.sub
    )
    return res.status(200).json(userCourses)
  }


export default { create, read, listCourseUser}