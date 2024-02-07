'use strict'


export default [
/*sql*/`

    SELECT app_plan.doctors

    FROM sm_account

    INNER JOIN sm_admin
    ON sm_admin.id_sm_account = sm_account.id

    INNER JOIN app_plan
    ON app_plan.id = sm_admin.id_app_plan

    WHERE sm_account.id = $1
    AND sm_account.deleted_at IS NULL
    AND sm_admin.plan_expiration_date > NOW()
    AND sm_admin.deleted_at IS NULL

`,
/*sql*/`

    SELECT COUNT(*)::integer as total_doctors

    FROM sm_collaborator

    INNER JOIN sm_account
    ON sm_account.id = sm_collaborator.id_sm_account

    WHERE sm_account.id_app_role = 3
    AND sm_collaborator.id_sm_admin = (
        SELECT id

        FROM sm_admin

        WHERE sm_admin.id_sm_account = $1
        AND sm_admin.deleted_at IS NULL
    )
    AND sm_account.deleted_at IS NULL
    AND sm_collaborator.deleted_at IS NULL

`
]