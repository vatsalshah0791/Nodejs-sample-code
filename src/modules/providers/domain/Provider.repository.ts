'use strict'


import { CheckPlanInterface } from './interfaces/CheckPlan.interface'
import { CreateProviderInterface, CreateProviderResultInterface } from './interfaces/CreateProvider.interface'
import { ReadProvidersInterface, ReadProvidersResultInterface } from './interfaces/ReadProviders.interface'
import { UpdateProviderInterface } from './interfaces/UpdateProvider.interface'
import { DeleteProviderInterface } from './interfaces/DeleteProvider.interface'


export default interface ProviderRepository {

    checkPlan(data: CheckPlanInterface): Promise<boolean>

    createProvider(data: CreateProviderInterface): Promise<CreateProviderResultInterface>

    readProviders(data: ReadProvidersInterface): Promise<ReadProvidersResultInterface[]>

    updateProvider(data: UpdateProviderInterface): Promise<boolean>

    deleteProvider(data: DeleteProviderInterface): Promise<boolean>

}