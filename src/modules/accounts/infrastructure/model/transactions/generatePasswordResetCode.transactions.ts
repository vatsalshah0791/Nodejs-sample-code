'use strict'


export default [
/*sql*/`

    SELECT
        sm_account.id,
        sm_account.is_active,
        CASE
            WHEN sm_account.id_app_role = 1 THEN sm_admin.email
            WHEN sm_account.id_app_role = 2 THEN sm_patient.email
            WHEN sm_account.id_app_role IN (3, 4, 5, 6, 7) THEN sm_collaborator.email
            ELSE NULL
        END AS email

    FROM sm_account

    LEFT JOIN sm_admin
    ON sm_admin.id_sm_account = sm_account.id

    LEFT JOIN sm_patient
    ON sm_patient.id_sm_account = sm_account.id

    LEFT JOIN sm_collaborator
    ON sm_collaborator.id_sm_account = sm_account.id

    WHERE sm_account.username = $1
    AND sm_account.deleted_at IS NULL

`,
/*sql*/`

    INSERT INTO sm_code (
        code,
        id_sm_account
    ) VALUES (
        $1,
        $2
    )

`
]