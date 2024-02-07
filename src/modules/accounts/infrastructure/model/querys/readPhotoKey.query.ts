'use strict'


export default /*sql*/`

    SELECT photo

    FROM sm_account

    WHERE id = $1
    AND deleted_at IS NULL

`