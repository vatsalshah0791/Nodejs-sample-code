'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
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
	paymentInformation: {
		card: {
			expirationMonth: string
			expirationYear: string
			type: string
			hashedNumber: string
		}
	}
    tokenInformation: {
        paymentInstrument: {
            id: string
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
		const requestObj = new cybersourceRestClient.CreatePaymentRequest()

        const processingInformation = new cybersourceRestClient.Ptsv2paymentsProcessingInformation()
		processingInformation.actionList = 'TOKEN_CREATE'
		processingInformation.actionTokenTypes = 'customer'
		requestObj.processingInformation = processingInformation

		const paymentInformation = new cybersourceRestClient.Ptsv2paymentsPaymentInformation()
		const paymentInformationCard = new cybersourceRestClient.Ptsv2paymentsPaymentInformationCard()
		const paymentInformationCustomer = new cybersourceRestClient.Ptsv2paymentsPaymentInformationCustomer()
		paymentInformationCard.number = data.cardNumber
		paymentInformationCard.expirationMonth = data.cardExpirationMonth
		paymentInformationCard.expirationYear = data.cardExpirationYear
		paymentInformationCard.type = data.cardType
		paymentInformationCard.securityCode = data.cardSecurityCode
		paymentInformationCustomer.customerId = data.customerId
		paymentInformation.card = paymentInformationCard
		paymentInformation.customer = paymentInformationCustomer
		requestObj.paymentInformation = paymentInformation

		const orderInformation = new cybersourceRestClient.Ptsv2paymentsOrderInformation()
		const orderInformationAmountDetails = new cybersourceRestClient.Ptsv2paymentsOrderInformationAmountDetails()
		orderInformationAmountDetails.totalAmount = '5'
		orderInformationAmountDetails.currency = 'USD'
		orderInformation.amountDetails = orderInformationAmountDetails

		const orderInformationBillTo = new cybersourceRestClient.Ptsv2paymentsOrderInformationBillTo()
		orderInformationBillTo.firstName = data.billToFirstName
		orderInformationBillTo.lastName = data.billToLastName
		orderInformationBillTo.address1 = data.billToAddress
		orderInformationBillTo.locality = data.billLocality
		orderInformationBillTo.postalCode = data.billToPostalCode
		orderInformationBillTo.country = data.billToCountry
		orderInformationBillTo.email = data.billToEmail
		orderInformation.billTo = orderInformationBillTo
		requestObj.orderInformation = orderInformation

		const deviceInformation = new cybersourceRestClient.Ptsv2paymentsDeviceInformation()
		deviceInformation.fingerprintSessionId = data.fingerprintSessionId
		requestObj.deviceInformation = deviceInformation

		console.log(requestObj)
		const instance = new cybersourceRestClient.PaymentsApi(config, apiClient)

		return new Promise((resolve, reject) => {
			instance.createPayment(requestObj, (error: Error, customerPaymentInstrument: CustomerPaymentInstrument) => {
				if(error) {
                    reject(error)
                    return
			    }
				console.log(customerPaymentInstrument)
				const result: Result = {
                    id: customerPaymentInstrument.tokenInformation.paymentInstrument.id || '',
                    number: customerPaymentInstrument.paymentInformation.card.hashedNumber,
                    type: customerPaymentInstrument.paymentInformation.card.type,
                    expirationMonth: customerPaymentInstrument.paymentInformation.card.expirationMonth,
                    expirationYear: customerPaymentInstrument.paymentInformation.card.expirationYear
                }
                resolve(result)
			})
		})

    } catch (error) {
        throw error
    }
}