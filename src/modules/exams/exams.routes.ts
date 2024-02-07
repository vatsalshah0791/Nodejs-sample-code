'use strict'


import { Router } from 'express'

import bacterialPlaqueRoutes from './bacterialPlaque/infrastructure/bacterialPlaque.routes'
import othodonticsRoutes from './orthodontics/infrastructure/orthodontics.routes'
import endodonticsRoutes from './endodontics/infrastructure/endodontics.routes'
import atmRoutes from './atm/infrastructure/atm.routes'
import periodontogramRoutes from './periodontogram/infrastructure/periodontogram.routes'
import odontogramRoutes from './odontogram/infrastructure/odontogram.routes'


const router = Router()


router.use('/exams', bacterialPlaqueRoutes)
router.use('/exams', othodonticsRoutes)
router.use('/exams', endodonticsRoutes)
router.use('/exams', atmRoutes)
router.use('/exams', periodontogramRoutes)
router.use('/exams', odontogramRoutes)


export default router