'use strict'

export default /*sql*/`

    SELECT
        id,
        time_zone

    FROM app_time_zone

    WHERE id_app_country = $1
    AND deleted_at IS NULL

`