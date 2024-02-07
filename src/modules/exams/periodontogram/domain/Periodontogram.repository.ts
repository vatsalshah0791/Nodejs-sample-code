'use strict'


import { ReadPeriodontogramInterface, ReadPeriodontogramResultInterface } from './interfaces/ReadPeriodontogram.interface'
import { ReadPeriodontogramTeethInterface, ReadPeriodontogramTeethResultInterface } from './interfaces/ReadPeriodontogramTeeth.interface'
import { UpdateFurcationInjuryInterface } from './interfaces/UpdateFurcationInjury.interface'
import { UpdateGingivalMarginInterface } from './interfaces/UpdateGingivalMargin.interface'
import { UpdateMobilityInterface } from './interfaces/UpdateMobility.interface'
import { UpdatePeriodontalPocketInterface } from './interfaces/UpdatePeriodontalPocket.interface'
import { UpdateQuestionsInterface } from './interfaces/UpdateQuestions.interface'


export default interface PeriodontogramRepository {

    readPeriodontogram(data: ReadPeriodontogramInterface): Promise<ReadPeriodontogramResultInterface[]>

    readPeriodontogramTeeth(data: ReadPeriodontogramTeethInterface): Promise<ReadPeriodontogramTeethResultInterface>

    updateQuestions(data: UpdateQuestionsInterface): Promise<boolean>

    updateMobility(data: UpdateMobilityInterface): Promise<boolean>

    updateFurcationInjury(data: UpdateFurcationInjuryInterface): Promise<boolean>

    updateGingivalMargin(data: UpdateGingivalMarginInterface): Promise<boolean>

    updatePeriodontalPocket(data: UpdatePeriodontalPocketInterface): Promise<boolean>

}