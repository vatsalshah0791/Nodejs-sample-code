'use strict'


import { CheckPlanInterface } from './interfaces/CheckPlan.interface'
import { CreateDentalChairInterface, CreateDentalChairResultInterface } from './interfaces/CreateDentalChair.interface'
import { ReadDentalChairsInterface, ReadDentalChairsResultInterface } from './interfaces/ReadDentalChairs.interface'
import { UpdateDentalChairInterface } from './interfaces/UpdateDentalChair.interface'
import { DeleteDentalChairInterface } from './interfaces/DeleteDentalChair.interface'


export default interface DentalChairRepository {

    checkPlan(data: CheckPlanInterface): Promise<boolean>

    createDentalChair(data: CreateDentalChairInterface): Promise<CreateDentalChairResultInterface>

    readDentalChairs(data: ReadDentalChairsInterface): Promise<ReadDentalChairsResultInterface[]>

    updateDentalChair(data: UpdateDentalChairInterface): Promise<boolean>

    deleteDentalChair(data: DeleteDentalChairInterface): Promise<boolean>

}