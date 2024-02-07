'use strict'


export default /*sql*/`

    SELECT
        id,
        chair_name,
        is_available

    FROM sm_dental_chair

    WHERE id_sm_clinic = $1
    AND deleted_at IS NULL

`