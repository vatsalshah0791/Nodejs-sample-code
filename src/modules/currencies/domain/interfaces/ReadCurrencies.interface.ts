'use strict'


import AppCurrency from '../entities/AppCurrency'


export interface ReadCurrenciesResultInterface {
    id: AppCurrency['id']
    currencyName: AppCurrency['currencyName']
    currencySymbol: AppCurrency['currencySymbol']
}