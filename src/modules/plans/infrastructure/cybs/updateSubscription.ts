'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
    planId: string
    subscriptionId: string
}


export default (data: DataInterface): Promise<boolean> => {
    try {
        const apiClient = new cybersourceRestClient.ApiClient()
        const requestObj = new cybersourceRestClient.UpdateSubscription()

        const subscriptionInformation = new cybersourceRestClient.Rbsv1subscriptionsidSubscriptionInformation()
		subscriptionInformation.planId = data.planId
		requestObj.subscriptionInformation = subscriptionInformation

		const instance = new cybersourceRestClient.SubscriptionsApi(config, apiClient)

        return new Promise((resolve, reject) => {
            instance.updateSubscription(data.subscriptionId, requestObj, (error: Error) => {
                if(error) {
                    reject(error)
                    return
                }
                const result = true
                resolve(result)
            })
        })
    } catch (error) {
        throw error
    }
}