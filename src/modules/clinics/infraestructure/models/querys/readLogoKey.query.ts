'use strict'


export default /*sql*/`

    SELECT logo

    FROM sm_clinic

    WHERE id = $1
    AND deleted_at IS NULL

`