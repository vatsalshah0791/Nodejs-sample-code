'use strict'

import {
    CreateAppointmentInterface,
    CreateAppointmentResultInterface,
    ReadAppointmentInterface,
    ReadAppointmentResultInterface,
    UpdateAppointmentInterface,
    UpdateStatusInterface,
    ReadAppointmentsByPatientInterface,
    ReadAppointmentsByClinicInterface,
    ReadAppointmentsResultInterface
} from './Appointment.interface'

export default interface AppointmentRepository {

    createAppointment(data: CreateAppointmentInterface): Promise<CreateAppointmentResultInterface>

    readAppointment(data: ReadAppointmentInterface): Promise<ReadAppointmentResultInterface>

    updateAppointment(data: UpdateAppointmentInterface): Promise<boolean>

    updateStatus(data: UpdateStatusInterface): Promise<boolean>

    readAppointmentsByPatient(data: ReadAppointmentsByPatientInterface): Promise<ReadAppointmentsResultInterface[]>

    readAppointmentsByClinic(data: ReadAppointmentsByClinicInterface): Promise<ReadAppointmentsResultInterface[]>

}