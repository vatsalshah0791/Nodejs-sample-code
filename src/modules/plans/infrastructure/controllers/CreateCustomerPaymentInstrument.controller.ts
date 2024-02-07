'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCustomerApplication from '../../application/ReadCustomer.application'

import { createCustomerPaymentInstrumentSchemaBodyTypes } from '../schemas/createCustomerPaymentInstrument.schema'

import listPaymentInstrumentsForACustomer from '../cybs/listPaymentInstrumentsForACustomer'
import getCreditCardType from '../scripts/getCreditCardType'
import createCustomerInsrumentIdentifier from '../cybs/createCustomerInsrumentIdentifier'
import createCustomerInsrument from '../cybs/createCustomerInsrument'

export default class CreateCustomerPaymentInstrumentController {
    constructor(
        private readonly readCustomerApplication: ReadCustomerApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createCustomerPaymentInstrumentSchemaBodyTypes>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            idAccount: req.idAccount,
            body: {
                card: {
                    number: req.body.card.number,
                    expirationMonth: req.body.card.expirationMonth,
                    expirationYear: req.body.card.expirationYear,
                    cvv: req.body.card.cvv
                },
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                locality: req.body.locality,
                postalCode: req.body.postalCode,
                country: req.body.country,
                fingerprintSessionId: req.body.fingerprintSessionId
            }
        }
        try {
            const getCreditCardTypeResult = getCreditCardType({ cardNumber: payload.body.card.number })
            if(getCreditCardTypeResult === '000') {
                req.apiResponse = {
                    success: false,
                    message: 'Card not accepted.',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(400)
                return next()
            }

            const readCustomerApplicationResult = await this.readCustomerApplication.run({ idAccount: payload.idAccount })
            if(!readCustomerApplicationResult.success) {
                req.apiResponse = {
                    success: readCustomerApplicationResult.success,
                    message: readCustomerApplicationResult.message,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(readCustomerApplicationResult.statusCode)
                return next()
            }
            if(!readCustomerApplicationResult.data?.customerId) {
                req.apiResponse = {
                    success: false,
                    message: 'No associated client was found.',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(400)
                return next()
            }

            const getListPaymentInstrumentForCustomerResult = await listPaymentInstrumentsForACustomer({
                customerTokenId: readCustomerApplicationResult.data.customerId
            })
            if(getListPaymentInstrumentForCustomerResult.total >= 3) {
                req.apiResponse = {
                    success: false,
                    message: 'Three card limit reached',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(400)
                return next()
            }
            const customerInstrumentIdentifier = await createCustomerInsrumentIdentifier({
                cardNumber: payload.body.card.number
            })
            const customerInsrument = await createCustomerInsrument({
                customerInstrumentIdentifier:customerInstrumentIdentifier.id,
                customerId: readCustomerApplicationResult.data.customerId,
                cardNumber: payload.body.card.number,
                cardExpirationMonth: payload.body.card.expirationMonth,
                cardExpirationYear: payload.body.card.expirationYear,
                cardType: getCreditCardTypeResult,
                cardSecurityCode: payload.body.card.cvv,
                billToFirstName: payload.body.firstName,
                billToLastName: payload.body.lastName,
                billToAddress: payload.body.address,
                billLocality: payload.body.locality,
                billToPostalCode: payload.body.postalCode,
                billToCountry: payload.body.country,
                billToEmail: readCustomerApplicationResult.data.email as string,
                fingerprintSessionId: payload.body.fingerprintSessionId
            })
            req.apiResponse = {
                success: true,
                message: 'success',
                accessToken: { refresh: false },
                language: { refresh: false },
                data: customerInsrument
            }
            res.status(201)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}