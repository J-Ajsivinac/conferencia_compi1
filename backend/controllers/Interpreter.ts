import { Request, Response } from "express";

export class Interpreter{
    public running (_: Request, res: Response){
        res.json({
            console: "Interpreter is running..."
        })
    }
}
