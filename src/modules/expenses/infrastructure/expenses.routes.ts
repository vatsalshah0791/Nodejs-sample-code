'use strict'


import { Router } from 'express'

import {
    createRentalExpenseController,
    createServiceExpenseController,
    createOtherExpenseController,
    readRentalExpensesController,
    readWagesController,
    readServiceExpensesController,
    readOtherExpensesController,
    readFixedCostsByMonthController,
    updateRentalExpenseController,
    updateServiceExpenseController,
    updateOtherExpenseController,
    deleteRentalExpenseController,
    deleteServiceExpenseController,
    deleteOtherExpenseController,
    readDayExpensesByProviderTypeController,
    readWeekExpensesByProviderTypeController,
    readMonthExpensesByProviderTypeController,
    readYearExpensesByProviderTypeController,
    readCommissionsByMonthController,
    readCommissionsByYearController,
    readCommissionsByDoctorController,
    readMonthVariableExpendsController,
    readYearVariableExpendsController
} from './dependencies'

import { createRentalExpenseSchema } from './schemas/createRentalExpense.schema'
import { createServiceExpenseSchema } from './schemas/createServiceExpense.schema'
import { createOtherExpenseSchema } from './schemas/createOtherExpense.schema'
import { readFixedCostsSchema } from './schemas/readFixedCosts.schemas'
import { updateRentalExpenseSchema } from './schemas/updateRentalExpense.schema'
import { updateServiceExpenseSchema } from './schemas/updateServiceExpense.schema'
import { updateOtherExpenseSchema } from './schemas/updateOtherExpense.schema'
import { deleteFixedCostsSchema } from './schemas/deleteFixedCosts.schema'
import { readDayExpensesByProviderTypeSchema } from './schemas/readDayExpensesByProviderType.schema'
import { readWeekExpensesByProviderTypeSchema } from './schemas/readWeekExpensesByProviderType.schema'
import { readMonthExpensesByProviderTypeSchema } from './schemas/readMonthExpensesByProviderType.schema'
import { readYearExpensesByProviderTypeSchema } from './schemas/readYearExpensesByProviderType.schema'
import { readCommissionsByMonthSchema } from './schemas/readCommissionsByMonth.schema'
import { readCommissionsByYearSchema } from './schemas/readCommissionsByYear.schema'
import { readCommissionsByDoctorSchema } from './schemas/readCommissionsByDoctor.schema'
import { readMonthVariableExpendsSchema } from './schemas/readMonthVariableExpends.schema'
import { readYearVariableExpendsSchema } from './schemas/readYearVariableExpends.schema'

import {
    isAuthController,
    schemaValidator,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '6'


router.post(
    '/expenses/rentals',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createRentalExpenseSchema),
    createRentalExpenseController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/services',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createServiceExpenseSchema),
    createServiceExpenseController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/others',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createOtherExpenseSchema),
    createOtherExpenseController.run,
    refreshTokenController.run
)
router.get(
    '/expenses/rentals/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readFixedCostsSchema),
    readRentalExpensesController.run,
    refreshTokenController.run
)
router.get(
    '/expenses/wages/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readFixedCostsSchema),
    readWagesController.run,
    refreshTokenController.run
)
router.get(
    '/expenses/services/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readFixedCostsSchema),
    readServiceExpensesController.run,
    refreshTokenController.run
)
router.get(
    '/expenses/others/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readFixedCostsSchema),
    readOtherExpensesController.run,
    refreshTokenController.run
)
router.get(
    '/expenses/fixedCosts/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readFixedCostsSchema),
    readFixedCostsByMonthController.run,
    refreshTokenController.run
)
router.put(
    '/expenses/rentals/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateRentalExpenseSchema),
    updateRentalExpenseController.run,
    refreshTokenController.run
)
router.put(
    '/expenses/services/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateServiceExpenseSchema),
    updateServiceExpenseController.run,
    refreshTokenController.run
)
router.put(
    '/expenses/others/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateOtherExpenseSchema),
    updateOtherExpenseController.run,
    refreshTokenController.run
)
router.delete(
    '/expenses/rentals/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(deleteFixedCostsSchema),
    deleteRentalExpenseController.run,
    refreshTokenController.run
)
router.delete(
    '/expenses/services/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(deleteFixedCostsSchema),
    deleteServiceExpenseController.run,
    refreshTokenController.run
)
router.delete(
    '/expenses/others/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(deleteFixedCostsSchema),
    deleteOtherExpenseController.run,
    refreshTokenController.run
)

router.post(
    '/expenses/variableExpends/day',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readDayExpensesByProviderTypeSchema),
    readDayExpensesByProviderTypeController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/variableExpends/week',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readWeekExpensesByProviderTypeSchema),
    readWeekExpensesByProviderTypeController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/variableExpends/month',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readMonthExpensesByProviderTypeSchema),
    readMonthExpensesByProviderTypeController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/variableExpends/year',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readYearExpensesByProviderTypeSchema),
    readYearExpensesByProviderTypeController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/variableExpends/commissions/month',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readCommissionsByMonthSchema),
    readCommissionsByMonthController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/variableExpends/commissions/year',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readCommissionsByYearSchema),
    readCommissionsByYearController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/variableExpends/commissions/doctor',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readCommissionsByDoctorSchema),
    readCommissionsByDoctorController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/variableExpends/all/month',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readMonthVariableExpendsSchema),
    readMonthVariableExpendsController.run,
    refreshTokenController.run
)
router.post(
    '/expenses/variableExpends/all/year',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readYearVariableExpendsSchema),
    readYearVariableExpendsController.run,
    refreshTokenController.run
)

export default router