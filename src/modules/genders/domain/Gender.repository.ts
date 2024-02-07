'use strict'


import { ReadGendersResultInterface } from './interfaces/RenderGenders.interface'


export default interface GenderRepository {

    readGenders(): Promise<ReadGendersResultInterface[]>

}