'use strict'


export default /*sql*/`

    SELECT username

    FROM sm_account

    WHERE username = $1
    AND deleted_at IS NULL

`