'use strict'


export default /*sql*/`

    SELECT column_name

    FROM information_schema.columns

    WHERE table_name = 'sm_orthodontics'
    AND data_type = 'jsonb'

`