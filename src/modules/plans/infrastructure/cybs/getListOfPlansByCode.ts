'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
    planCode: string
}

interface PlansInterface {
    totalCount: number
    plans: {
        id: string
        planInformation: { code: string }
    }[]
}


export default (data: DataInterface): Promise<string> => {
    try {
        const ops = { code: data.planCode }

		const apiClient = new cybersourceRestClient.ApiClient()
		const instance = new cybersourceRestClient.PlansApi(config, apiClient)

        return new Promise((resolve, reject) => {
            instance.getPlans(ops, (error: Error, plans: PlansInterface) => {
                if(error) {
                    reject(error)
                    return
                }
                if(plans.totalCount === 0) {
                    reject(new Error('The plan is not for sale.'))
                    return
                }
                if(plans.totalCount > 1) {
                    reject(new Error('There is a conflict with the selected plan.'))
                    return
                }
                const plan = plans.plans.find(el => el.planInformation.code === data.planCode)
                const result = plan?.id as string
                resolve(result)
            })
        })
    } catch (error) {
        throw error
    }
}