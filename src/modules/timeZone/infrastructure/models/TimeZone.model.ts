'use strict'


import { QueryResult, Pool } from 'pg'

import TimeZoneRepository from '../../domain/TimeZone.repository'

import { ReadTimeZoneInterface, ReadTimeZoneResultInterface } from '../../domain/interfaces/ReadTimeZone.interface'

import readTimeZonesQuery from './querys/readTimeZones.query'


export default class TimeZoneModel implements TimeZoneRepository {
    constructor(private readonly db: () => Pool) {}
    async readTimeZones(data: ReadTimeZoneInterface): Promise<ReadTimeZoneResultInterface[]> {
        try {
            const values = [data.idCountry]
            const readTimeZonesQueryResult: QueryResult = await this.db().query(readTimeZonesQuery, values)
            const timeZones = readTimeZonesQueryResult.rows.map(element => {
                const newElement: ReadTimeZoneResultInterface = {
                    id: element.id,
                    timeZone: element.time_zone
                }
                return newElement
            })
            return timeZones
        } catch (error) {
            console.error('ERROR -- MODEL: TimeZoneModel.readTimeZones')
            throw error
        }
    }
}