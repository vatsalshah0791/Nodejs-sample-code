'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
    cardNumber: string
}

interface CustomerPaymentInstrumentIdentifier {
	id: string,
	object: string,
	state: string,
	card: {
		number: string
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
		const requestObj = new cybersourceRestClient.PostInstrumentIdentifierRequest()

		const card = new cybersourceRestClient.Tmsv2customersEmbeddedDefaultPaymentInstrumentEmbeddedInstrumentIdentifierCard()
		card.number = data.cardNumber
		requestObj.card = card;

		const instance = new cybersourceRestClient.InstrumentIdentifierApi(config, apiClient)
		return new Promise((resolve, reject) => {
			instance.postInstrumentIdentifier(requestObj, [], (error:Error, customerPaymentInstrumentIdentifier:CustomerPaymentInstrumentIdentifier) => {
				if (error) {
					reject(error)
					return
				}
				const result: Result = {
                    id: customerPaymentInstrumentIdentifier.id
                }
                resolve(result)
			});
		})
    } catch (error) {
        throw error
    }
}