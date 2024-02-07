'use strict'


export default /*sql*/`

    SELECT column_name

    FROM information_schema.columns

    WHERE table_name = 'sm_atm'
    AND data_type = 'jsonb'

`