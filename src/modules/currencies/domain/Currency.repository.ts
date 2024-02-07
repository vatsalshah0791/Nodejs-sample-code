'use strict'


import { ReadCurrenciesResultInterface } from './interfaces/ReadCurrencies.interface'


export default interface CurrencyRespository {

    readCurrencies(): Promise<ReadCurrenciesResultInterface[]>

}