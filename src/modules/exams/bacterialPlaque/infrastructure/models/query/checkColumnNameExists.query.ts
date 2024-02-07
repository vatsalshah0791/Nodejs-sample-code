'use strict'


export default /*sql*/`

    SELECT column_name

    FROM information_schema.columns

    WHERE table_name = 'sm_bacterial_plaque'
    AND data_type = 'jsonb'

`