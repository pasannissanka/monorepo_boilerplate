import { Request, Response } from "express";

export interface ContextType {
    req: Request,
    res: Response,
    user: UserDecoded
}

export interface UserDecoded {
    email: string,
    uuid: string,
    iat: number,
    exp: number
}