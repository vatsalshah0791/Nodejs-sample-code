'use strict'


import SmDentalChair from '../entities/SmDentalChair'


export interface CreateDentalChairInterface {
    chairName: SmDentalChair['chairName']
    idSmClinic: SmDentalChair['idSmClinic']
}

export interface CreateDentalChairResultInterface {
    success: boolean
    id?: SmDentalChair['id']
}