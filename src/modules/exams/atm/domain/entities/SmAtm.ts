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
    }>
}
export default interface SmAtm {
    id: string
    examNotes: string
    questions:  JSONB
    snap: JSONB
    crepitation: JSONB
    pain: JSONB
    opening: JSONB
    closing: JSONB
    treatment: JSONB
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    idSmPatient: string
}