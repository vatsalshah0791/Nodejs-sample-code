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
export default interface SmPeriodontogram {
    id: string
    teeth: number
    questions: JSONB
    mobility: JSONB
    furcationInjury: JSONB
    gingivalMargin: {
        header: string
        data: {
            mesial: number
            central: number
            distal: number
        }
    }
    periodontalPocket: {
        header: string
        data: {
            mesial: number
            central: number
            distal: number
        }
    }
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    idSmPatient: string
}