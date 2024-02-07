'use strict'


export default [
/*sql*/`

    UPDATE sm_access_token

    SET deleted_at = NOW()

    WHERE id_sm_account = $1
    AND deleted_at IS NULL

`,
/*sql*/`

    UPDATE sm_code

    SET deleted_at = NOW()

    WHERE id_sm_account = $1
    AND deleted_at IS NULL

`,
/*sql*/`

    UPDATE sm_account

    SET
        real_password = $1,
        old_password = real_password

    WHERE id = $2
    AND deleted_at IS NULL

`
]