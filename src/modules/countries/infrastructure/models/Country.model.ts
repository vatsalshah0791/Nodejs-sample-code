'use strict'


import { QueryResult, Pool } from 'pg'

import CountryRepository from '../../domain/Country.repository'

import { ReadCountriesResultInterface } from '../../domain/interfaces/ReadCountries.interface'

import readCountriesQuery from './querys/readCountries.query'


export default class CountryModel implements CountryRepository {
    constructor(private readonly db: () => Pool) {}
    async readCountries(): Promise<ReadCountriesResultInterface[]> {
        try {
            const readCountriesQueryResult: QueryResult = await this.db().query(readCountriesQuery)
            const countries = readCountriesQueryResult.rows.map(element => {
                const newElement: ReadCountriesResultInterface = {
                    id: element.id,
                    countryName: element.country_name,
                    countryCode: element.country_code,
                    countryFlag: element.country_flag
                }
                return newElement
            })
            return countries
        } catch (error) {
            console.error('ERROR -- MODEL: CountryModel.readCountries')
            throw error
        }
    }
}