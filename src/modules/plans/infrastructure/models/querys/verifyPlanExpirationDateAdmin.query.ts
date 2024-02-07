'use strict'


export default /*sql*/`

    SELECT sm_admin.id

    FROM sm_account

    INNER JOIN sm_admin
    ON sm_admin.id_sm_account = sm_account.id

    WHERE sm_account.id = $1
    AND sm_account.deleted_at IS NULL
    AND sm_admin.plan_expiration_date > NOW()
    AND sm_admin.deleted_at IS NULL

`