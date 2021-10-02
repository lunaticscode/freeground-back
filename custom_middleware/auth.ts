import { check, validationResult } from "express-validator/check";
import { Request, Response, NextFunction } from 'express';
export default function(req: Request, res:Response, next: NextFunction) {
    /**
     * 
     * TODO ::: token-auth logic
     * 
     */
    const token = req.header('x-auth-token') as string;
    console.log(__filename, 'auth-middleware ::: token => ', token);
    next();
}