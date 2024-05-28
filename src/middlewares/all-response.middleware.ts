import { Request, Response, NextFunction } from "express";

export const AllResponse = (req: Request, res: Response, next: NextFunction) => {
        //console.log('Response : ', res.pipe);
        next()
    }