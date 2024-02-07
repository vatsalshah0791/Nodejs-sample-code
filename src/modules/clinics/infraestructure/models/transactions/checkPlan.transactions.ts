'use strict'


export default [
/*sql*/`

    SELECT
        app_plan.clinics,
        sm_admin.id AS as_id_sm_admin

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

    SELECT COUNT(*)::integer AS total_clinics

    FROM sm_clinic

    WHERE id_sm_admin = $1
    AND deleted_at IS NULL

`
]