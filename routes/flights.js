import { Router } from 'express'

const router = Router()

// GET localhost:3000/flights/index
router.get('/', flightsCtrl.index)

export { router }
