'use strict'


export default /*sql*/`

    SELECT id

    FROM sm_account

    WHERE id = $1
    AND is_active = true
    AND is_verified = true
    AND deleted_at IS NULL

`