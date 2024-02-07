'use strict'


import { CheckColumnNameExists } from './interface/CheckColumnNameExists.interface'
import { ReadOrthodonticsInterface, ReadOrthodonticsResultInterface } from './interface/ReadOrthodontics'
import { UpdateExamNotesInterface } from './interface/UpdateExamNotes.interface'
import { UpdateOrthodonticsInterface } from './interface/UpdateOrthodontics.interface'
import { UpdateOverbiteHorizontalInterface } from './interface/UpdateOverbiteHorizontal.interface'
import { UpdateOverbiteVerticalInterface } from './interface/UpdateOverbiteVertical.interface'
import { UpdateMiddleLineInterface } from './interface/UpdateMiddleLine.interface'


export default interface OrthodonticsRepository {

    checkColumnNameExists(data: CheckColumnNameExists): Promise<boolean>

    readOrthodontics(data: ReadOrthodonticsInterface): Promise<ReadOrthodonticsResultInterface>

    updateExamNotes(data: UpdateExamNotesInterface): Promise<boolean>

    updateOrthodontics(data: UpdateOrthodonticsInterface): Promise<boolean>

    updateOverbiteHorizontal(data: UpdateOverbiteHorizontalInterface): Promise<boolean>

    updateOverbiteVertical(data: UpdateOverbiteVerticalInterface): Promise<boolean>

    updateMiddleLine(data: UpdateMiddleLineInterface): Promise<boolean>

}