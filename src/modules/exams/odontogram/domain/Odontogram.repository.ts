'use strict'


import { ReadOdontogramInterface, ReadOdontogramResultInterface } from './interfaces/ReadOdontogram.interface'
import { ReadOdontogramTeethInterface, ReadOdontogramTeethResultInterface } from './interfaces/ReadOdontogramTeeth.interface'
import { UpdateQuestionsInterface } from './interfaces/UpdateQuestions.interface'
import { UpdateGeneralOdontologyInterface } from './interfaces/UpdateGeneralOdontology.interface'
import { UpdateProsthesisInterface } from './interfaces/UpdateProsthesis.interface'
import { UpdateProsthesisMultilineInterface } from './interfaces/UpdateProsthesisMultiline.interface'
import { UpdateEndodonticsInterface } from './interfaces/UpdateEndodontics.interface'
import { UpdateOrthodonticsInterface } from './interfaces/UpdateOrthodontics.interface'


export default interface OdontogramRepository {

    readOdontogram(data: ReadOdontogramInterface): Promise<ReadOdontogramResultInterface[]>

    readOdontogramTeeth(data: ReadOdontogramTeethInterface): Promise<ReadOdontogramTeethResultInterface>

    updateQuestions(data: UpdateQuestionsInterface): Promise<boolean>

    updateGeneralOdontology(data: UpdateGeneralOdontologyInterface): Promise<boolean>

    updateProsthesis(data: UpdateProsthesisInterface): Promise<boolean>

    updateProsthesisMultiline(data: UpdateProsthesisMultilineInterface): Promise<boolean>

    updateEndodontics(data: UpdateEndodonticsInterface): Promise<boolean>

    updateOrthodontics(data: UpdateOrthodonticsInterface): Promise<boolean>

}