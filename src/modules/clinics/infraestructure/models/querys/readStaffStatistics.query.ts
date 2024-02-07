'use strict'


export default /*sql*/`

    SELECT
        (
            SELECT COUNT(*)::integer

            FROM sm_patient

            WHERE id_sm_clinic = $1
            AND deleted_at IS NULL
        ) AS total_patients,
        (
            SELECT COUNT(*)::integer

            FROM sm_collaborator_sm_clinic

            INNER JOIN sm_collaborator
            ON sm_collaborator.id = sm_collaborator_sm_clinic.id_sm_collaborator

            INNER JOIN sm_account
            ON sm_account.id = sm_collaborator.id_sm_account

            WHERE sm_collaborator_sm_clinic.id_sm_clinic = $1
            AND sm_collaborator_sm_clinic.deleted_at IS NULL
            AND sm_account.id_app_role = 3
        ) AS total_doctors,
        (
            SELECT COUNT(*)::integer

            FROM sm_collaborator_sm_clinic

            INNER JOIN sm_collaborator
            ON sm_collaborator.id = sm_collaborator_sm_clinic.id_sm_collaborator

            INNER JOIN sm_account
            ON sm_account.id = sm_collaborator.id_sm_account

            WHERE sm_collaborator_sm_clinic.id_sm_clinic = $1
            AND sm_collaborator_sm_clinic.deleted_at IS NULL
            AND sm_account.id_app_role IN(3, 4, 5, 6, 7)
        ) AS total_collaborators

`