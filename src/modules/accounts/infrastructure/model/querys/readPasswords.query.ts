'use strict'


export default /*sql*/`

    SELECT
        real_password,
        old_password

    FROM sm_account

    WHERE id = $1
    AND is_active = true
    AND is_verified = true
    AND deleted_at IS NULL

`