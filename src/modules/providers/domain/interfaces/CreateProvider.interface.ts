'use strict'


import SmProvider from '../entities/SmProvider'


export interface CreateProviderInterface {
    title: SmProvider['title']
    email: SmProvider['email']
    fullAddress: SmProvider['fullAddress']
    phonePrefix: SmProvider['phonePrefix']
    phone: SmProvider['phone']
    website: SmProvider['website']
    idAppProviderType: SmProvider['idAppProviderType']
    idSmClinic: SmProvider['idSmClinic']
}

export interface CreateProviderResultInterface {
    success: boolean
    id?: SmProvider['id']
}