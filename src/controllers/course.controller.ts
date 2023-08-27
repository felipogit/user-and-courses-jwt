import { Request, Response } from "express";
import { Course, CourseRead } from "../interfaces";
import { courseServices, userServices } from "../services";
import { AppError } from "../errors";

const create = async (req: Request, res: Response): Promise<Response> => {
    const course: Course = await courseServices.create(
        req.body,
         res.locals.decoded.sub
         );
    return res.status(201).json(course);
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const courses: CourseRead = await courseServices.read();
    return res.status(200).json(courses);
  };

const enrollCurse = async(req: Request, res: Response): Promise<Response> => {
    
    const userExists = await userServices.checkIfUserExists(
        req.params.userId
    )
    
    if(!userExists){
        throw new AppError("User/course not found", 404)
    }

    const courseExists = await courseServices.checkIfCourseExists(
        req.params.courseId
    )

    if(!courseExists){
        throw new AppError("User/course not found", 404)
    }

    await courseServices.enrollCurse(
        req.params.userId,
        req.params.courseId
        );
    
    return res.status(201).json({message: "User successfully vinculed to course"});
}

const deleteUserFromCourse = async(req: Request, res: Response): Promise<Response> => {
    const { userId, courseId } = req.params;
    await courseServices.deleteUserFromCourse(userId, courseId);
    return res.status(204).json();
}


export default { create, read, enrollCurse, deleteUserFromCourse };