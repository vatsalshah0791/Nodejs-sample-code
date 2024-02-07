'use strict'


export default /*sql*/`

    SELECT
        id,
        clinic_name,
        email,
        logo

    FROM sm_clinic

    WHERE id IN (
        SELECT id

        FROM sm_collaborator_sm_clinic

        WHERE sm_collaborator_sm_clinic.id_sm_collaborator = (
            SELECT id

            FROM sm_collaborator

            WHERE sm_collaborator.id_sm_account = $1
        )
        AND sm_collaborator_sm_clinic.deleted_at IS NULL
    )
    AND deleted_at IS NULL

`