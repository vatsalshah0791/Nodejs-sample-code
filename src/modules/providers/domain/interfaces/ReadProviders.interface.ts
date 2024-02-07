'use strict'


import SmProvider from '../entities/SmProvider'


export interface ReadProvidersInterface {
    idClinic: string
}

export interface ReadProvidersResultInterface {
    id: SmProvider['id']
    title: SmProvider['title']
    email: SmProvider['email']
    fullAddress: SmProvider['fullAddress']
    phonePrefix: SmProvider['phonePrefix']
    phone: SmProvider['phone']
    website: SmProvider['website']
    providerType: string
    idAppProviderType: SmProvider['idAppProviderType']
}