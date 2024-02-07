'use strict'


import { QueryResult } from 'pg'


export const checkSelect = (queryResult: QueryResult): boolean => queryResult.rows.length > 0 ? true: false


export const checkInsert = (queryResult: QueryResult): boolean => queryResult.rowCount > 0 ? true : false