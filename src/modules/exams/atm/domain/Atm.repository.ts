'use strict'


import { CheckColumnNameExists } from './interface/CheckColumnNameExists.interface'
import { ReadAtmInterface, ReadAtmResultInterface } from './interface/ReadAtm.interface'
import { UpdateExamNotesInterface } from './interface/UpdateExamNotes.interface'
import { UpdateAtmInterface } from './interface/UpdateAtm.interface'
import { UpdateAtmMultilineInterface } from './interface/UpdateAtmMultiline.interface'


export default interface AtmRepository {

    checkColumnNameExists(data: CheckColumnNameExists): Promise<boolean>

    readAtm(data: ReadAtmInterface): Promise<ReadAtmResultInterface>

    updateExamNotes(data: UpdateExamNotesInterface): Promise<boolean>

    updateAtm(data: UpdateAtmInterface): Promise<boolean>

    updateAtmMultiline(data: UpdateAtmMultilineInterface): Promise<boolean>

}