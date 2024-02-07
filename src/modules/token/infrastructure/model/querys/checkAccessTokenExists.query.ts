'use strict'


export default /*sql*/`

    SELECT
        app_role.id AS as_id_app_role,
        sm_account.id AS as_id_sm_account

    FROM sm_access_token

    INNER JOIN sm_account
    ON sm_access_token.id_sm_account = sm_account.id

    INNER JOIN app_role
    ON app_role.id = sm_account.id_app_role

    WHERE sm_access_token.access_token = $1
    AND sm_access_token.deleted_at IS NULL
    AND sm_account.id = $2
    AND sm_account.is_active = true
    AND sm_account.deleted_at IS NULL
    AND (
        $3 = true OR sm_account.is_verified = true
    )

`