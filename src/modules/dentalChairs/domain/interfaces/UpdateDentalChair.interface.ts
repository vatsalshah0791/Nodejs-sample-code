'use strict'


import SmDentalChair from '../entities/SmDentalChair'


export interface UpdateDentalChairInterface {
    chairName: SmDentalChair['chairName']
    isAvailable: SmDentalChair['isAvailable']
    id: SmDentalChair['id']
}