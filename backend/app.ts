import express from "express"
import { corsM } from './middlewares/CorsManagment'; 
import router from "./routes/Interpreter";

export const createAPI = () =>{
    const app = express()
    app.use(express.json())
    app.use(corsM)

    app.get('/', (req,res)=>{
        res.send('Backend is Running...')
    })

    app.use('/interpreter', router)

    const PORT = 3002
    app.listen(PORT, ()=>{
        console.log(`server listening on port http://localhost:${PORT}`)
    })
}

createAPI()