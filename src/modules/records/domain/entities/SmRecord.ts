'use strict'


interface JSONB {
    header: string
    data: Array<{
        title: string
        value: boolean
    }>
}
export default interface SmRecord {
    id: string
    medicalHistoryNotes: string
    dentalHistoryNotes: string
    allergies: JSONB
    heartProblems: JSONB
    medicalRecord: JSONB
    sensitivity: JSONB
    oralExam: JSONB
    ailments: JSONB
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    idSmPatient: string
}