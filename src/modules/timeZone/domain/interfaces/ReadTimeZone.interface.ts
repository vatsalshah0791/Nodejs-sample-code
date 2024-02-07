'use strict'


import AppTimeZone from '../entities/AppTimeZone'


export interface ReadTimeZoneInterface {
    idCountry: AppTimeZone['idAppCountry']
}

export interface ReadTimeZoneResultInterface {
    id: AppTimeZone['id']
    timeZone: AppTimeZone['timeZone']
}