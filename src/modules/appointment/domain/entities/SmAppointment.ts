'use strict'

export default interface SmAppointment {
    id: string
    appointmentDate: Date
    startTime: string
    endingTime: string
    annotations: string | null
    status: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idDentalChair: string
    idCollaborator: string
    idDentalTreatment: string
    idPatient: string
    idClinic: string
}