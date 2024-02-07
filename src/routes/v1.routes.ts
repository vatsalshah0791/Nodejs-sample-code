'use strict'


import { Router, Response } from 'express'

import accountRoutes from '../modules/accounts/infrastructure/accounts.routes'
import languagesRoutes from '../modules/language/infrastructure/languages.routes'
import countriesRoutes from '../modules/countries/infrastructure/countries.routes'
import gendersRoutes from '../modules/genders/infrastructure/genders.routes'
import clinicsRoutes from '../modules/clinics/infraestructure/clinics.routes'
import rolesRoutes from '../modules/roles/infrastructure/roles.routes'
import currenciesRouters from '../modules/currencies/infrastructure/currencies.routes'
import timeZonesRoutes from '../modules/timeZone/infrastructure/timeZones.routes'
import collaboratorsRoutes from '../modules/collaborators/infrastructure/collaborators.routes'
import collaboratorsPayRoutes from '../modules/collaborators/infrastructure/collaboratorsPay.routes'
import doctorsRoutes from '../modules/collaborators/infrastructure/doctors.routes'
import permissionsRoutes from '../modules/permissions/infrastructure/permissions.routes'
import patientsRoutes from '../modules/patients/infrastructure/patients.routes'
import recordsRoutes from '../modules/records/infrastructure/records.routes'
import examsRoutes from '../modules/exams/exams.routes'
import dentalChairsRoutes from '../modules/dentalChairs/infrastructure/dentalChair.routes'
import dentalTreatmentsRoutes from '../modules/dentalTreatment/infrastructure/dentalTreatment.routes'
import providersTypesRoutes from '../modules/providerTypes/infrastructure/providerType.routes'
import providersRoutes from '../modules/providers/infrastructure/providers.routes'
import productsRoutes from '../modules/products/infrastructure/products.routes'
import photosRoutes from '../modules/photos/infrastructure/photos.routes'
import patientDentalTreatmentsRoutes from '../modules/patientDentalTreatments/infrastructure/patientDentalTreatments.routes'
import patientPaymentMethodsRoutes from '../modules/patientPaymentMethod/infrastructure/patientPaymentMethod.routes'
import paymentsRoutes from '../modules/payments/infrastructure/payments.routes'
import incomesRoutes from '../modules/incomes/infrastructure/incomes.routes'
import expensesRoutes from '../modules/expenses/infrastructure/expenses.routes'

import appointmentsRoutes from '../modules/appointment/infrastructure/appointments.routes'
import billsRoutes from '../modules/bills/infrastructure/bill.routes'
import inventoryRoutes from '../modules/inventory/infrastructure/inventory.routes'
import plansRoutes from '../modules/plans/infrastructure/plans.routes'
import discountPlansRoutes from '../modules/discountPlans/infrastructure/discountPlans.router'



const router = Router()


router.use('/v1', accountRoutes)
router.use('/v1', languagesRoutes)
router.use('/v1', countriesRoutes)
router.use('/v1', gendersRoutes)
router.use('/v1', clinicsRoutes)
router.use('/v1', rolesRoutes)
router.use('/v1', currenciesRouters)
router.use('/v1', timeZonesRoutes)
router.use('/v1', collaboratorsRoutes)
router.use('/v1', collaboratorsPayRoutes)
router.use('/v1', doctorsRoutes)
router.use('/v1', permissionsRoutes)
router.use('/v1', patientsRoutes)
router.use('/v1', recordsRoutes)
router.use('/v1', examsRoutes)
router.use('/v1', dentalChairsRoutes)
router.use('/v1', dentalTreatmentsRoutes)
router.use('/v1', providersTypesRoutes)
router.use('/v1', providersRoutes)
router.use('/v1', productsRoutes)
router.use('/v1', photosRoutes)
router.use('/v1', patientDentalTreatmentsRoutes)
router.use('/v1', patientPaymentMethodsRoutes)
router.use('/v1', paymentsRoutes)
router.use('/v1', incomesRoutes)
router.use('/v1', expensesRoutes)


router.use('/v1', appointmentsRoutes)
router.use('/v1', billsRoutes)
router.use('/v1', inventoryRoutes)
router.use('/v1', plansRoutes)
router.use('/v1', discountPlansRoutes)
router.get('/test', (_, res: Response ) => res.status(200).json({ message: 'Api v1' }))


export default router
