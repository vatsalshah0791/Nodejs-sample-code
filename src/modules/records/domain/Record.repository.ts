'use strict'


import { ReadRecordInterface, ReadRecordResultInterface } from './interfaces/ReadRecord.interface'
import { UpdateMedicalHistoryNotesInterface } from './interfaces/UpdateMedicalHistoryNotes.interface'
import { UpdateDentalHistoryNotesInterface } from './interfaces/UpdateDentalHistoryNotes.interface'
import { CheckColumnNameExists } from './interfaces/CheckColumnNameExists.interface'
import { UpdateRecordInterface } from './interfaces/UpdateRecord.interface'


export default interface RecordRepository {

    readRecord(data: ReadRecordInterface): Promise<ReadRecordResultInterface>

    updateMedicalHistoryNotes(data: UpdateMedicalHistoryNotesInterface): Promise<boolean>

    updateDentalHistoryNotes(data: UpdateDentalHistoryNotesInterface): Promise<boolean>

    checkColumnNameExists(data: CheckColumnNameExists): Promise<boolean>

    updateRecord(data: UpdateRecordInterface): Promise<boolean>

}