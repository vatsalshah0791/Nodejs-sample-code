'use strict'


import AppPatientPaymentMethod from '../entities/AppPatientPaymentMethod'


export interface ReadPatientPaymentMethodResultInterface {
    id: AppPatientPaymentMethod['id']
    paymentMethod: AppPatientPaymentMethod['paymentMethod']
}