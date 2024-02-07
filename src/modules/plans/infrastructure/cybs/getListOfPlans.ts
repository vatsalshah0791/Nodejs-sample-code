'use strict'


import cybersourceRestClient from 'cybersource-rest-client'

import config from './config'


interface DataInterface {
    id: string
    planCode: string
    clinics: number
    dentalChairs: number
    doctors: number
    collaborators: number
    patients: number
    isActive?: boolean
}

interface PlansInterface {
    plans: {
        planInformation: {
            code: string
            name: string
            billingPeriod: {
                unit: string
            }
        },
        orderInformation: {
            amountDetails: {
                currency: string
                billingAmount: string
            }
        }
    }[]
}


export default (data: DataInterface[]) => {
    try {
		const apiClient = new cybersourceRestClient.ApiClient()
		const instance = new cybersourceRestClient.PlansApi(config, apiClient)

        return new Promise((resolve, reject) => {
            instance.getPlans({}, (error: Error, plans: PlansInterface) => {
                if(error) {
                    reject(error)
                    return
                }
                const newData = data.map(element => {
                    const planData = element.planCode === 'P_free' ? ({
                        planInformation: {
                            name: 'FREE',
                            billingPeriod: { unit: 'N' }
                        },
                        orderInformation: {
                            amountDetails: {
                                currency: 'USD',
                                billingAmount: '0',
                            }
                        }
                    }) : (plans.plans.find(el => el.planInformation.code === element.planCode))
                    const newElement = {
                        id: element.id,
                        clinics: element.clinics,
                        dentalChairs: element.dentalChairs,
                        doctors: element.doctors,
                        collaborators: element.collaborators,
                        patients: element.patients,
                        isActive: element.isActive,
                        name: planData?.planInformation.name,
                        currency: planData?.orderInformation.amountDetails.currency,
                        billingAmount: planData?.orderInformation.amountDetails.billingAmount,
                        unit: planData?.planInformation.billingPeriod.unit
                    }
                    return newElement
                })
                resolve(newData)
            })
        })
    } catch (error) {
        throw error
    }
}
