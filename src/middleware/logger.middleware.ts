import type { Request, Response, NextFunction } from "express"

 export const getRequestMethodandUrl = (
    req:Request, 
    res:Response, 
    next:NextFunction
):void => {

    const date = new Date().toISOString();

    res.on("finish", ():void => {
        console.log(`[${date}] ${req.method} ${req.originalUrl} → ${res.statusCode}`);
        
    })

    next();
}