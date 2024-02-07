'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
    customerId: string
    paymentInstrumentId: string
}


export default (data: DataInterface) => {
    try {
        const apiClient = new cybersourceRestClient.ApiClient()

        const instance = new cybersourceRestClient.CustomerPaymentInstrumentApi(config, apiClient)

        return new Promise((resolve, reject) => {
            instance.deleteCustomerPaymentInstrument(data.customerId, data.paymentInstrumentId, [], (error: Error) => {
                if(error) {
                    reject(error)
                    return
                }
                resolve(true)
            })
        })
    } catch (error) {
        throw error
    }
}