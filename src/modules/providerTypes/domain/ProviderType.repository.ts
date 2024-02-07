'use strict'


import { ReadProviderTypeResultInterface } from './interface/ReadProviderTypes.interface'


export default interface ProviderTypeRepository {

    readProviderType(): Promise<ReadProviderTypeResultInterface[]>

}