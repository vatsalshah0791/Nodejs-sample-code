'use strict'


import CountryRepository from '../domain/Country.repository'

import { ReadCountriesResultInterface } from '../domain/interfaces/ReadCountries.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadCountriesResultInterface[]
}


export default class ReadCountriesApplication {
    constructor(private readonly countryRepository: CountryRepository) {}
    async run(): Promise<Result> {
        const readCountriesResult = await this.countryRepository.readCountries()
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readCountriesResult
        }
        return response
    }
}