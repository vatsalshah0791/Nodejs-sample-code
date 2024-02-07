'use strict'


interface JSONB {
    header: string
    data: Array<{
        title: string
        value?: boolean
        values?: Array<{
            title?: string
            value?: boolean
        }>
        length?: string
        instrumentation?: string
    }>
}
export default interface SmEndodonticsTeeth {
    id: string
    teeth: number
    pain:  JSONB
    clinicalExamination: JSONB
    xRays: JSONB
    sensitivityTest: JSONB
    diagnosis: JSONB
    ducts: JSONB
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    idSmPatient: string
}