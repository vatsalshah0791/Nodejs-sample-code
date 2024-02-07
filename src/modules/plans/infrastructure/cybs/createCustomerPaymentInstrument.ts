'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
    customerId: string
    cardExpirationMonth: string
    cardExpirationYear: string
    cardType: string
    billToFirstName: string
    billToLastName: string
    billToAddress: string,
    billToPostalCode: string,
    billToCountry: string
    instrumentIdentifierId: string
}

interface CustomerPaymentInstrument {
    id: string
    card: {
        expirationMonth: string
        expirationYear: string
        type: string
    }
    _embedded: {
        instrumentIdentifier: {
            card: {
                number: string
            }
        }
    }
}

interface Result {
    id: string
    number: string
    type: string
    expirationMonth: string
    expirationYear: string
}


export default (data: DataInterface): Promise<Result> => {
    try {
        const apiClient = new cybersourceRestClient.ApiClient()
		const requestObj = new cybersourceRestClient.PostCustomerPaymentInstrumentRequest()

		const card = new cybersourceRestClient.Tmsv2customersEmbeddedDefaultPaymentInstrumentCard()
		card.expirationMonth = data.cardExpirationMonth
		card.expirationYear = data.cardExpirationYear
		card.type = data.cardType
		requestObj.card = card

        const billTo = new cybersourceRestClient.Tmsv2customersEmbeddedDefaultPaymentInstrumentBillTo()
		billTo.firstName = data.billToFirstName
		billTo.lastName = data.billToLastName
        billTo.address1 = data.billToAddress
        billTo.postalCode = data.billToPostalCode
        billTo.country = data.billToCountry
		requestObj.billTo = billTo

        const instrumentIdentifier = new cybersourceRestClient.Tmsv2customersEmbeddedDefaultPaymentInstrumentInstrumentIdentifier()
		instrumentIdentifier.id = data.instrumentIdentifierId
		requestObj.instrumentIdentifier = instrumentIdentifier

		const instance = new cybersourceRestClient.CustomerPaymentInstrumentApi(config, apiClient)

        return new Promise((resolve, reject) => {
            instance.postCustomerPaymentInstrument(data.customerId, requestObj, [], (error: Error, customerPaymentInstrument: CustomerPaymentInstrument) => {
                if(error) {
                    reject(error)
                    return
			    }
                const result: Result = {
                    id: customerPaymentInstrument.id,
                    number: customerPaymentInstrument._embedded.instrumentIdentifier.card.number,
                    type: customerPaymentInstrument.card.type,
                    expirationMonth: customerPaymentInstrument.card.expirationMonth,
                    expirationYear: customerPaymentInstrument.card.expirationYear
                }
                resolve(result)
		    })
        })
    } catch (error) {
        throw error
    }
}