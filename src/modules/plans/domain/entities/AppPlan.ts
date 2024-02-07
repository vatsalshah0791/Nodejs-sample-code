'use strict'


export default interface AppPlan {
    id: string
    planCode: string
    clinics: number
    dentalChairs: number
    doctors: number
    collaborators: number
    patients: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}