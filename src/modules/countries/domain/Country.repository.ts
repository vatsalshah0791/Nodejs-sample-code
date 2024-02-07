'use strict'


import { ReadCountriesResultInterface } from './interfaces/ReadCountries.interface'


export default interface CountryRepository {

    readCountries(): Promise<ReadCountriesResultInterface[]>

}