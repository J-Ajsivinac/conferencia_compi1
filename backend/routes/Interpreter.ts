import express from 'express'

import { Interpreter } from '../controllers/Interpreter'

const router = express.Router()
const main: Interpreter = new Interpreter()

router.get('/', main.running)

export default router