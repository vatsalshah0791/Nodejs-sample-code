'use strict'


export default [
/*sql*/`

    SELECT
        sm_account.first_name,
        sm_account.last_name,
        sm_admin.email

    FROM sm_account

    INNER JOIN sm_admin
    ON sm_admin.id_sm_account = sm_account.id

    WHERE sm_account.id = $1
    AND sm_account.deleted_at IS NULL
    AND sm_admin.deleted_at IS NULL

`,
/*sql*/`

    INSERT INTO sm_verification_code (
        verification_code,
        id_sm_account
    ) VALUES (
        $1,
        $2
    )

`
]