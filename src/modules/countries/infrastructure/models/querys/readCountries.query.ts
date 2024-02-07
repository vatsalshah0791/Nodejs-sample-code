'use strict'


export default /*sql*/`

    SELECT
        id,
        country_name,
        country_code,
        country_flag

    FROM app_country

    WHERE deleted_at IS NULL

`