'use strict'


interface DataNewPlanInterface {
    clinics: number
    dentalChairs: number
    doctors: number
    collaborators: number
    patients: number
}

interface DataCurrentPlanInterface {
    clinics: number
    dentalChairs: number[]
    doctors: number
    collaborators: number
    patients: number
}

interface Result {
    success: boolean
    message: string
}


export default (newPlan: DataNewPlanInterface, currentPlan: DataCurrentPlanInterface): Result => {
    if(newPlan.clinics !== -1 && (currentPlan.clinics > newPlan.clinics)) {
        const result: Result = {
            success: false,
            message: `Impossible to update the plan, reduce the number of clinics to ${newPlan.clinics}`
        }
        return result
    }
    if(newPlan.dentalChairs !== -1 && currentPlan.dentalChairs.some(element => element > newPlan.dentalChairs)) {
        const result: Result = {
            success: false,
            message: `Impossible to update the plan, A clinic has more than ${newPlan.dentalChairs} dental chairs`
        }
        return result
    }
    if(newPlan.doctors !== -1 && (currentPlan.doctors > newPlan.doctors)) {
        const result: Result = {
            success: false,
            message: `Impossible to update the plan, reduce the number of doctors to ${newPlan.doctors}`
        }
        return result
    }
    if(newPlan.collaborators !== -1 && (currentPlan.collaborators > newPlan.collaborators)) {
        const result: Result = {
            success: false,
            message: `Impossible to update the plan, reduce the number of collaborators to ${newPlan.doctors}`
        }
        return result
    }
    if(newPlan.patients !== -1 && (currentPlan.patients > newPlan.patients)) {
        const result: Result = {
            success: false,
            message: `Impossible to update the plan, reduce the number of patients to ${newPlan.doctors}`
        }
        return result
    }
    const result: Result = {
        success: true,
        message: `Success`
    }
    return result
}