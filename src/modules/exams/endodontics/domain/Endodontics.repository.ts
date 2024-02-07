'use strict'


import { ReadEndodonticsInterface, ReadEndodonticsResultInterface } from './interface/ReadEndodontics.interface'
import { ReadEndodonticsTeethInterface, ReadEndodonticsTeethResultInterface } from './interface/ReadEndodonticsTeeth.interface'
import { UpdateExamNotesInterface } from './interface/UpdateExamNotes.interface'
import { UpdatePainInterface } from './interface/UpdatePain.interface'
import { UpdateClinicalExaminationInterface } from './interface/UpdateClinicalExamination.interface'
import { UpdateClinicalExaminationMultilineInterface } from './interface/UpdateClinicalExaminationMultiline.interface'
import { UpdateXRaysInterface } from './interface/UpdateXRays.interface'
import { UpdateSensitivityTestInterface } from './interface/UpdateSensitivityTest.interface'
import { UpdateDiagnosisInterface } from './interface/UpdateDiagnosis.interface'
import { UpdateDuctsInterface } from './interface/UpdateDucts.interface'


export default interface EndodonticsRepository {

    readEndodontics(data: ReadEndodonticsInterface): Promise<ReadEndodonticsResultInterface>

    readEndodonticsTeeth(data: ReadEndodonticsTeethInterface): Promise<ReadEndodonticsTeethResultInterface>

    updateExamNotes(data: UpdateExamNotesInterface): Promise<boolean>

    updatePain(data: UpdatePainInterface): Promise<boolean>

    updateClinicalExamination(data: UpdateClinicalExaminationInterface): Promise<boolean>

    updateClinicalExaminationMultiline(data: UpdateClinicalExaminationMultilineInterface): Promise<boolean>

    updateXRays(data: UpdateXRaysInterface): Promise<boolean>

    updateSensitivityTest(data: UpdateSensitivityTestInterface): Promise<boolean>

    updateDiagnosis(data: UpdateDiagnosisInterface): Promise<boolean>

    updateDucts(data: UpdateDuctsInterface): Promise<boolean>

}