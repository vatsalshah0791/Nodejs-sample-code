'use strict'


import { CheckPlanInterface } from './interfaces/CheckPlan.interface'


export default interface DoctorRepository {

    checkPlan(data: CheckPlanInterface): Promise<boolean>

}