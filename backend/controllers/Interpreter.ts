import { Request, Response } from "express";
import { Node } from "../Classes/Utils/Node";
import { Environment } from "../Classes/Env/Environment";

export const globalSave: Environment = new Environment(null, 'Global')

export class Interpreter{
    public running (_: Request, res: Response){
        res.json({
            console: "Interpreter is running..."
        })
    }
    
    public parser(req: Request, res: Response) {
        let code: string = req.body.code
        let parser = require('../language/Parser')
        var errors:[] = []; 
        try {
            let init = new Node("Init");
            let instructions = parser.parse(code,errors)
            

            for (let instruction of instructions) {
                instruction.execute()
                init.pushChild(instruction.ast())
            }
            console.log(globalSave)
            console.log(init.getDot())
            res.json({
                ast: init.getDot(),
                errors: "getErrorsString()"
            })
        } catch (err) {
            res.json({
                console: err
            })
            console.log(err)
        }
    }
}
