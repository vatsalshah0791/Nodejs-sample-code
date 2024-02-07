'use strict'


interface JSONB {
    header: string
    data: Array<{
        title: string
        values: Array<{
            title: string
            value: boolean
        }>
    }>
    form?: {
        overbiteHorizontal: number
        overbiteVertical: number
        middleLine: {
            coincident: number,
            mandibular: number,
            maxillary: number
        }
    }
}
export default interface SmOrthodontics {
    id: string
    examNotes: string
    softTissue: JSONB
    dentalExam: JSONB
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    idSmPatient: string
}