'use strict'


import SmAccount from '../entities/SmAccount'
import SmAdmin from '../entities/SmAdmin'


export interface UpdateAdminAccountInterface {
    idAccount: SmAccount['id']
    firstName: SmAccount['firstName']
    lastName: SmAccount['lastName']
    phonePrefix?: SmAdmin['phonePrefix']
    phone?: SmAdmin['phone']
    companyName: SmAdmin['companyName']
    birthDate: SmAdmin['birthDate']
    idAppGender: string
    idAppCountry: string
}