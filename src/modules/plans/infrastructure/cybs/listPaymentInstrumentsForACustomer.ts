'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
    customerTokenId: string
}

interface CustomerPaymentInstrument {
    total: number
    _embedded: {
        paymentInstruments: {
            id: string
            default: boolean
            state: string
            card: {
                expirationMonth: string
                expirationYear: string
                type: string
            }
            billTo: {
                firstName: string
                lastName: string
            }
            _embedded: {
                instrumentIdentifier: {
                    card: {
                        number: string
                    }
                }
            }
        }[]
    }
}

interface Result {
    total: number
    paymentsIntrument: {
        id: string
        default: boolean
        state: string
        card: object
        billTo: object
    }[]
}


export default (data: DataInterface): Promise<Result> => {
    try {
        const apiClient = new cybersourceRestClient.ApiClient()

        const instance = new cybersourceRestClient.CustomerPaymentInstrumentApi(config, apiClient)

        return new Promise((resolve, reject) => {
            instance.getCustomerPaymentInstrumentsList(data.customerTokenId, {}, function (error: Error, customerPaymentsInstrument: CustomerPaymentInstrument) {
                if(error) {
                    reject(error)
                    return
                }
                if(customerPaymentsInstrument.total === 0) {
                    const result: Result = {
                        total: 0,
                        paymentsIntrument: []
                    }
                    resolve(result)
                    return
                }
                const newCustomerPaymentsInstrument = customerPaymentsInstrument._embedded.paymentInstruments.map(element => {
                    const newElement = {
                        id: element.id,
                        default: element.default,
                        state: element.state,
                        card: {
                            expirationMonth: element.card.expirationMonth,
			                expirationYear: element.card.expirationYear,
			                type: element.card.type,
                            number: element._embedded.instrumentIdentifier.card.number
                        },
                        billTo: element.billTo
                    }
                    return newElement
                })
                const result: Result = {
                    total: customerPaymentsInstrument.total,
                    paymentsIntrument: newCustomerPaymentsInstrument
                }
                resolve(result)
            })
        })
    } catch (error) {
        throw error
    }
}
