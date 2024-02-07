'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
	customerInstrumentIdentifier: string
    customerId: string
    cardNumber: string
    cardExpirationMonth: string
    cardExpirationYear: string
	cardType: string
    cardSecurityCode: string
	billToFirstName: string
    billToLastName: string
    billToAddress: string
	billLocality: string
    billToPostalCode: string
    billToCountry: string
	billToEmail: string
	fingerprintSessionId: string
}

interface CustomerPaymentInstrument {
	id: string,
	default: string,
	state: string,
	card: {
		expirationMonth: string,
		expirationYear: string,
		type: string

	},
	billTo: object,
	instrumentIdentifier: {
		id: string
	},
	metadata:{
		creator: string
	}
}

interface Result {
    id: string
}


export default (data: DataInterface): Promise<Result> => {
    try {
		const apiClient = new cybersourceRestClient.ApiClient()
		const requestObj = new cybersourceRestClient.PostCustomerPaymentInstrumentRequest()

		requestObj._default = false
		const card = new cybersourceRestClient.Tmsv2customersEmbeddedDefaultPaymentInstrumentCard()
		card.expirationMonth = data.cardExpirationMonth
		card.expirationYear = data.cardExpirationYear
		card.type = data.cardType
		requestObj.card = card;

		const billTo  = new cybersourceRestClient.Tmsv2customersEmbeddedDefaultPaymentInstrumentBillTo()
		billTo.firstName = data.billToFirstName
		billTo.lastName = data.billToLastName
		billTo.address1 = data.billToAddress
		billTo.locality = data.billLocality
		billTo.postalCode = data.billToPostalCode
		billTo.country = data.billToCountry
		billTo.email = data.billToEmail
		requestObj.billTo  = billTo 

		const instrumentIdentifier = new cybersourceRestClient.Tmsv2customersEmbeddedDefaultPaymentInstrumentInstrumentIdentifier();
		instrumentIdentifier.id = data.customerInstrumentIdentifier
		requestObj.instrumentIdentifier = instrumentIdentifier;

		const instance = new cybersourceRestClient.CustomerPaymentInstrumentApi(config, apiClient)
		return new Promise((resolve, reject) => {
			instance.postCustomerPaymentInstrument(data.customerId, requestObj, [], (error:Error, customerPaymentInstrument:CustomerPaymentInstrument) => {
				if (error) {
					reject(error)
					return
				}
				const result: Result = {
                    id: customerPaymentInstrument.id
                }
                resolve(result)
			});
		})
    } catch (error) {
        throw error
    }
}