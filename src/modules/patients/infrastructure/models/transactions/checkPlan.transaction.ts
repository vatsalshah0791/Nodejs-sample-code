'use strict'


export default [
/*sql*/`

    SELECT app_plan.patients

    FROM sm_clinic

    INNER JOIN sm_admin
    ON sm_admin.id = sm_clinic.id_sm_admin

    INNER JOIN app_plan
    ON app_plan.id = sm_admin.id_app_plan

    WHERE sm_clinic.id = $1
    AND sm_clinic.deleted_at IS NULL
    AND sm_admin.plan_expiration_date > NOW()
    AND sm_admin.deleted_at IS NULL

`,
/*sql*/`

    SELECT COUNT(*)::integer AS total_patients

    FROM sm_patient

    WHERE id_sm_clinic = $1
    AND deleted_at IS NULL

`
]