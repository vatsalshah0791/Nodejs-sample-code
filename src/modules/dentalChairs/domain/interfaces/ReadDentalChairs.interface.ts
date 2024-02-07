'use strict'


import SmDentalChair from '../entities/SmDentalChair'


export interface ReadDentalChairsInterface {
    idClinic: string
}

export interface ReadDentalChairsResultInterface {
    id: SmDentalChair['id']
    chairName: SmDentalChair['chairName']
    isAvailable: SmDentalChair['isAvailable']
}