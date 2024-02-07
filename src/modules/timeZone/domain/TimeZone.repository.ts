'use strict'


import { ReadTimeZoneInterface, ReadTimeZoneResultInterface } from './interfaces/ReadTimeZone.interface'


export default interface TimeZoneRepository {

    readTimeZones(data: ReadTimeZoneInterface): Promise<ReadTimeZoneResultInterface[]>

}