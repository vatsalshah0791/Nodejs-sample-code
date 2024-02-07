'use strict'


export default /*sql*/`

    SELECT photo

    FROM sm_photo

    WHERE id = $1
    AND deleted_at IS NULL

`