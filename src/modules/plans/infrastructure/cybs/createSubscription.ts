'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
    planId: string
    name: string
    customerId: string
}

interface SubscriptionsInterface {
    id: string
}


export default (data: DataInterface): Promise<string> => {
    try {
        const apiClient = new cybersourceRestClient.ApiClient()
        const requestObj = new cybersourceRestClient.CreateSubscriptionRequest()

        const processingInformation = new cybersourceRestClient.Rbsv1subscriptionsProcessingInformation()
		processingInformation.commerceIndicator = 'recurring'
        const processingInformationAuthorizationOptions = new cybersourceRestClient.Rbsv1subscriptionsProcessingInformationAuthorizationOptions()
		const processingInformationAuthorizationOptionsInitiator = new cybersourceRestClient.Rbsv1subscriptionsProcessingInformationAuthorizationOptionsInitiator()
		processingInformationAuthorizationOptionsInitiator.type = 'merchant'
		processingInformationAuthorizationOptions.initiator = processingInformationAuthorizationOptionsInitiator
        processingInformation.authorizationOptions = processingInformationAuthorizationOptions
		requestObj.processingInformation = processingInformation

        const subscriptionInformation = new cybersourceRestClient.Rbsv1subscriptionsSubscriptionInformation()
		subscriptionInformation.planId = data.planId
		subscriptionInformation.name = data.name
		subscriptionInformation.startDate = new Date().toISOString()
		requestObj.subscriptionInformation = subscriptionInformation

        const paymentInformation = new cybersourceRestClient.Rbsv1subscriptionsPaymentInformation()
		const paymentInformationCustomer = new cybersourceRestClient.Rbsv1subscriptionsPaymentInformationCustomer()
		paymentInformationCustomer.id = data.customerId
		paymentInformation.customer = paymentInformationCustomer
		requestObj.paymentInformation = paymentInformation

		const instance = new cybersourceRestClient.SubscriptionsApi(config, apiClient)

        return new Promise((resolve, reject) => {
            instance.createSubscription(requestObj, (error: Error, subscription: SubscriptionsInterface) => {
                if(error) {
                    reject(error)
                    return
                }
                const result = subscription.id
                resolve(result)
            })
        })
    } catch (error) {
        throw error
    }
}