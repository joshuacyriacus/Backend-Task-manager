import type {Request, Response, NextFunction } from "express"

export const validateId = (req:Request<{id: string}>, res:Response, next:NextFunction) => {
     const { id } = req.params;

     if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            success:false,
            message: "Invalid task ID"
        })
     }

    next();
}