'use strict'


export default /*sql*/`

    SELECT
        id,
        gender_name

    FROM app_gender

    WHERE deleted_at IS NULL

`