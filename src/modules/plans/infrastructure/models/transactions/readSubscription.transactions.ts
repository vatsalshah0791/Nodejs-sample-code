'use strict'


export default [
/*sql*/`

    SELECT
        id,
	  	customer_id,
  		subscription_id,
        id_app_plan

    FROM sm_admin

    WHERE id_sm_account = $1
    AND deleted_at IS NULL

`,
/*sql*/`

    SELECT count(*) as clinics_created

    FROM sm_clinic

    WHERE id_sm_admin = $1
    AND deleted_at IS NULL

`,
/*sql*/`

    SELECT COUNT(sm_dental_chair.id) AS dental_chairs_created

    FROM sm_clinic

    LEFT JOIN sm_dental_chair
    ON sm_dental_chair.id_sm_clinic = sm_clinic.id
    AND sm_dental_chair.deleted_at IS NULL

    WHERE sm_clinic.id_sm_admin = $1
    AND sm_clinic.deleted_at IS NULL

    GROUP BY
        sm_clinic.id,
        sm_clinic.clinic_name

`,
/*sql*/`

    SELECT count(*) as collaborators_created

    FROM sm_collaborator

    INNER JOIN sm_account
    ON sm_account.id = sm_collaborator.id_sm_account

    WHERE sm_collaborator.id_sm_admin = $1
    AND sm_account.id_app_role = ANY($2)
    AND sm_collaborator.deleted_at IS NULL

`,
/*sql*/`

    SELECT count(*) as patients_created

    FROM sm_patient

    WHERE id_sm_clinic IN (
        SELECT id

        FROM sm_clinic

        WHERE id_sm_admin = $1
        AND deleted_at IS NULL
    )
    AND deleted_at IS NULL

`
]