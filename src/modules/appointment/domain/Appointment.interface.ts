'use strict'

import SmAppointment from './entities/SmAppointment'

export interface CreateAppointmentInterface {
    appointmentDate: SmAppointment['appointmentDate']
    startTime: SmAppointment['startTime']
    endingTime: SmAppointment['endingTime']
    annotations: SmAppointment['annotations']
    idDentalChair: SmAppointment['idDentalChair']
    idCollaborator: SmAppointment['idCollaborator']
    idDentalTreatment: SmAppointment['idDentalTreatment']
    idPatient: SmAppointment['idPatient']
    idClinic: SmAppointment['idClinic']
}
export interface CreateAppointmentResultInterface {
    success: boolean
    id: SmAppointment['id']
}

export interface ReadAppointmentInterface { id: SmAppointment['id'] }
export interface ReadAppointmentResultInterface {
    success: boolean,
    id?: SmAppointment['id']
    appointmentDate?: SmAppointment['appointmentDate']
    startTime?: SmAppointment['startTime']
    endingTime?: SmAppointment['endingTime']
    annotations?: SmAppointment['annotations']
    status?: SmAppointment['status']
    chair?: string
    doctor?: string
    treatment?: string
    price?: string
    email?: string
    phone?: string
    patient?: string
    photo?: string | null
    idDentalChair?: SmAppointment['idDentalChair']
    idDoctor?: SmAppointment['idCollaborator']
    idPatient?: SmAppointment['idPatient']
    idDentalTreatment?: SmAppointment['idDentalTreatment']
}

export interface UpdateAppointmentInterface {
    id: SmAppointment['id']
    appointmentDate: SmAppointment['appointmentDate']
    startTime: SmAppointment['startTime']
    endingTime: SmAppointment['endingTime']
    annotations: SmAppointment['annotations']
    idDentalChair: SmAppointment['idDentalChair']
    idCollaborator: SmAppointment['idCollaborator']
    idDentalTreatment: SmAppointment['idDentalTreatment']
}

export interface UpdateStatusInterface {
    id: SmAppointment['id']
    status: SmAppointment['status']
}

export interface ReadAppointmentsByPatientInterface { idPatient: SmAppointment['idPatient'] }

export interface ReadAppointmentsByClinicInterface { idClinic: SmAppointment['idClinic'] }

export interface ReadAppointmentsResultInterface {
    id?: SmAppointment['id']
    appointmentDate?: SmAppointment['appointmentDate']
    startTime?: SmAppointment['startTime']
    endingTime?: SmAppointment['endingTime']
    annotations?: SmAppointment['annotations']
    status?: SmAppointment['status']
    chair?: string
    doctor?: string
    treatment?: string
    price?: string
    email?: string
    phone?: string
    patient?: string
    photo?: string | null
    idDentalChair?: SmAppointment['idDentalChair']
    idDoctor?: SmAppointment['idCollaborator']
    idPatient?: SmAppointment['idPatient']
    idDentalTreatment?: SmAppointment['idDentalTreatment']
}