'use strict'


import AppProviderType from '../entities/AppProviderType'


export interface ReadProviderTypeResultInterface {
    id: AppProviderType['id']
    providerType: AppProviderType['providerType']
}