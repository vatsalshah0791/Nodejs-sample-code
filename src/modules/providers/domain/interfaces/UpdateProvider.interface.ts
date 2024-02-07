'use strict'


import SmProvider from '../entities/SmProvider'


export interface UpdateProviderInterface {
    title: SmProvider['title']
    email: SmProvider['email']
    fullAddress: SmProvider['fullAddress']
    phonePrefix: SmProvider['phonePrefix']
    phone: SmProvider['phone']
    website: SmProvider['website']
    idAppProviderType: SmProvider['idAppProviderType']
    id: SmProvider['id']
}