'use strict'


interface JSONB {
    header: string
    data: Array<{
        title: string
        value?: boolean
        values?: Array<{
            title: string
            value: boolean
        }>
    }>
}

export default interface SmOdontogram {
    id: string
    teeth: number
    questions: JSONB
    generalOdontology: JSONB
    prosthesis: JSONB
    endodontics: JSONB
    orthodontics: JSONB
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    idSmPatient: string
}