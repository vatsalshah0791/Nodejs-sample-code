'use strict'


export default /*sql*/`

    UPDATE sm_dental_chair

    SET deleted_at = NOW()

    WHERE id = $1
    AND deleted_at IS NULL

`