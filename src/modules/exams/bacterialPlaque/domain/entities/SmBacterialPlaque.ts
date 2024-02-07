'use strict'


interface JSONB {
    header: string
    data: Array<{
        title: string
        teeth: {
            primaryTooth: boolean,
            absent: boolean,
            mesial: boolean,
            lingual: boolean,
            distal: boolean,
            bucal: boolean,
            oclusal: boolean
        }
    }>
}
export default interface SmBacterialPlaque {
    id: string
    isAdult: boolean
    rightUpperQuadrant: JSONB
    upperLeftQuadrant: JSONB
    rightLowerQuadrant: JSONB
    lowerLeftQuadrant: JSONB
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    idSmPatient: string
}