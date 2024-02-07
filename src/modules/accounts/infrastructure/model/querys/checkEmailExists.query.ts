'use strict'


export default /*sql */`

    SELECT email

    FROM sm_admin

    WHERE email = $1
    AND deleted_at IS NULL

`