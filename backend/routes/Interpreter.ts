import express from 'express'

import { Interpreter } from '../Controllers/Interpreter'

const router = express.Router()
const main: Interpreter = new Interpreter()

router.get('/', main.running)
router.post('/parser', main.parser)

export default router