'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataIntrface {
    email: string,
    id: string
}

interface CustomerInterface {
    id: string
}


export default (data: DataIntrface): Promise<string> => {
    try {
		const apiClient = new cybersourceRestClient.ApiClient()
        const requestObj = new cybersourceRestClient.PostCustomerRequest()

        const buyerInformation = new cybersourceRestClient.Tmsv2customersBuyerInformation()
		buyerInformation.email = data.email
		requestObj.buyerInformation = buyerInformation

        const clientReferenceInformation = new cybersourceRestClient.Tmsv2customersClientReferenceInformation()
		clientReferenceInformation.code = data.id
		requestObj.clientReferenceInformation = clientReferenceInformation

		const instance = new cybersourceRestClient.CustomerApi(config, apiClient)

        return new Promise((resolve, reject) => {
            instance.postCustomer(requestObj, [], (error: Error, customer: CustomerInterface) => {
                if(error) {
                    reject(error)
                    return
                }
                const result = customer.id
                resolve(result)
            })
        })
    } catch (error) {
        throw error
    }
}
