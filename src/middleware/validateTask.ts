import type {Request, Response, NextFunction} from "express"
export const validateTask = (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
   const { title, description, priority } = req.body;

    if (title === undefined || title.trim() === "" ) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    if (description === undefined || description.trim() === "" ) {
        return res.status(400).json({
            success: false,
            message: "Description is required"
        });
    }

    if (typeof title !== "string" ) {
        return res.status(400).json({
            success: false,
            message: "Title must be a string"
        });
    }
 
    if (typeof description !== "string" ) {
        return res.status(400).json({
            success: false,
            message: "Description must be a string"
        });
    }

    if (priority === undefined || priority.trim() === "" ) {
        return res.status(400).json({
            success: false,
            message: "Priority is required"
        });
    }

    if (typeof priority !== "string" ) {
        return res.status(400).json({
            success: false,
            message: "Priority must be a string"
        });
    }

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
        return res.status(400).json({
            success: false,
            message: "Priority must be 'low', 'medium', or 'high'"
        });
    }

    next()
}