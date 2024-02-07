'use strict'


export default /*sql*/`

    UPDATE sm_dental_chair

    SET
        chair_name = $1,
        is_available = $2

    WHERE id = $3
    AND deleted_at IS NULL

`