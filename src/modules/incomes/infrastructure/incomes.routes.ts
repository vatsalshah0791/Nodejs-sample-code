'use strict'


import { Router } from 'express'

import {
    readPercentagesClinicController,
    readDayIncomesByClinicController,
    readWeekIncomesByClinicController,
    readMonthIncomesByClinicController,
    readYearIncomesByClinicController,
    readDayIncomesByDoctorController,
    readWeekIncomesByDoctorController,
    readMonthIncomesByDoctorController,
    readYearIncomesByDoctorController,
    readDayIncomesByTreatmentController,
    readWeekIncomesByTreatmentController,
    readMonthIncomesByTreatmentController,
    readYearIncomesByTreatmentController
} from './dependencies'

import { readDayIncomesSchema } from './schemas/readDayIncomes.schema'
import { readWeekIncomesSchema } from './schemas/readWeekIncomes.schema'
import { readMonthIncomesSchema } from './schemas/readMonthIncomes.schema'
import { readYearIncomesSchema } from './schemas/readYearIncomes.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController
} from './shared.import'


const router = Router()
const idSection = '5'


router.post(
    '/incomes/clinic/percentages',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readYearIncomesSchema),
    readPercentagesClinicController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/clinic/day',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readDayIncomesSchema),
    readDayIncomesByClinicController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/clinic/week',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readWeekIncomesSchema),
    readWeekIncomesByClinicController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/clinic/month',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readMonthIncomesSchema),
    readMonthIncomesByClinicController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/clinic/year',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readYearIncomesSchema),
    readYearIncomesByClinicController.run,
    refreshTokenController.run
)

router.post(
    '/incomes/doctor/day',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readDayIncomesSchema),
    readDayIncomesByDoctorController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/doctor/week',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readWeekIncomesSchema),
    readWeekIncomesByDoctorController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/doctor/month',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readMonthIncomesSchema),
    readMonthIncomesByDoctorController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/doctor/year',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readYearIncomesSchema),
    readYearIncomesByDoctorController.run,
    refreshTokenController.run
)

router.post(
    '/incomes/treatment/day',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readDayIncomesSchema),
    readDayIncomesByTreatmentController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/treatment/week',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readWeekIncomesSchema),
    readWeekIncomesByTreatmentController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/treatment/month',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readMonthIncomesSchema),
    readMonthIncomesByTreatmentController.run,
    refreshTokenController.run
)
router.post(
    '/incomes/treatment/year',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readYearIncomesSchema),
    readYearIncomesByTreatmentController.run,
    refreshTokenController.run
)


export default router