'use strict'

import { QueryResult } from 'pg'

const checkDataExists = (queryResult: QueryResult): boolean => queryResult.rows.length > 0 ? true: false

const checkDataAffected = (queryResult: QueryResult): boolean => queryResult.rowCount > 0 ? true : false

const formatDate = (column: string): string => `TO_CHAR(${column}::timestamp, 'YYYY-MM-DD')`

export {
    checkDataExists,
    checkDataAffected,
    formatDate
}