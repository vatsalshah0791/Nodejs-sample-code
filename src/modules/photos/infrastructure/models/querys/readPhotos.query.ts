'use strict'


export default /*sql*/`

    SELECT
        id,
        photo,
        TO_CHAR(created_at::timestamp, 'YYYY-MM-DD') as as_date

    FROM sm_photo

    WHERE id_sm_patient = $1
    AND deleted_at IS NULL

`