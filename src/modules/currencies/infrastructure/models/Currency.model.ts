'use strict'


import { QueryResult, Pool } from 'pg'

import CurrencyRespository from '../../domain/Currency.repository'

import { ReadCurrenciesResultInterface } from '../../domain/interfaces/ReadCurrencies.interface'

import readCurrenciesQuery from './querys/readCurrencies.query'


export default class CurrencyModel implements CurrencyRespository {
    constructor(private readonly db: () => Pool) {}
    async readCurrencies(): Promise<ReadCurrenciesResultInterface[]> {
        try {
            const readCurrenciesQueryResult: QueryResult = await this.db().query(readCurrenciesQuery)
            const currencies = readCurrenciesQueryResult.rows.map(element => {
                const newElement: ReadCurrenciesResultInterface = {
                    id: element.id,
                    currencyName: element.currency_name,
                    currencySymbol: element.currency_symbol
                }
                return newElement
            })
            return currencies
        } catch (error) {
            console.error('ERROR -- MODEL: CurrencyModel.readCurrencies')
            throw error
        }
    }
}