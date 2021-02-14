import { Request, Response } from "express";

export interface ContextType {
    req: Request,
    res: Response,
    user: UserDecoded
}

export interface UserDecoded {
    email: string,
    id: number,
    iat: number,
    exp: number
}