'use strict'


export interface ReadPatientsStatisticsInterface {
    id: string
}

export interface ReadPatientsStatisticsResultInterface {
    success: boolean
    graphPatients: number[]
}