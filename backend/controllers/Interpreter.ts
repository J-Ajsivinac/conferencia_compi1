import { Request, Response } from "express";
import { Node } from "../Classes/Utils/Node";

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
                init.pushChild(instruction.ast())
            }
            // let tree = ast[0].ast()
            // console.log(ast.ast())
            console.log(init.getDot())
            res.json({
                console: init.getDot(),
                errors: "getErrorsString()"
            })
        } catch (err) {
            res.json({
                console: err
            })
            console.log(errors.length)
        }
    }
}
