import { Request, Response } from "express";

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
            let ast = parser.parse(code,errors)
            let tree = ast[0].ast()
            // console.log(ast.ast())
            res.json({
                console: tree.getDot(),
                errors: "getErrorsString()"
            })
        } catch (err) {
            res.json({
                console: err
            })
            // console.log(errors.length)
        }
    }
}
