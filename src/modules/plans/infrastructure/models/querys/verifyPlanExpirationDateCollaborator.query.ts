'use strict'


export default /*sql*/ `

    SELECT sm_collaborator.id

    FROM sm_account

    INNER JOIN sm_collaborator
    ON sm_collaborator.id_sm_account = sm_account.id

    INNER JOIN sm_admin
    ON sm_admin.id = sm_collaborator.id_sm_admin

    WHERE sm_account.id = $1
    AND sm_account.deleted_at IS NULL
    AND sm_collaborator.deleted_at IS NULL
    AND sm_admin.plan_expiration_date > NOW()
    AND sm_admin.deleted_at IS NULL

`