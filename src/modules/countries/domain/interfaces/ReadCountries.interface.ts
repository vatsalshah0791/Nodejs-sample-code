'use strict'


import AppCountry from '../entities/AppCountry'


export interface ReadCountriesResultInterface {
    id: AppCountry['id']
    countryName: AppCountry['countryName']
    countryCode: AppCountry['countryCode']
    countryFlag: AppCountry['countryFlag']
}