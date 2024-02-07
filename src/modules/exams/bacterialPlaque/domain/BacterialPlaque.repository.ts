'use strict'


import { CheckColumnNameExists } from './interface/CheckColumnNameExists.interface'
import { ReadBacterialPlaqueInterface, ReadBacterialPlaqueResultInterface } from './interface/ReadBacterialPlaque.interface'
import { UpdateIsAdultInterface } from './interface/UpdateIsAdult.interface'
import { UpdateBacterialPlaqueInterface } from './interface/UpdateBacterialPlaque.interface'


export default interface BacterialPlaqueRepository {

    checkColumnNameExists(data: CheckColumnNameExists): Promise<boolean>

    readBacterialPlaque(data: ReadBacterialPlaqueInterface): Promise<ReadBacterialPlaqueResultInterface>

    updateIsAdult(data: UpdateIsAdultInterface): Promise<boolean>

    updateBacterialPlaque(data: UpdateBacterialPlaqueInterface): Promise<boolean>

}