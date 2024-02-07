'use strict'


export default /*sql*/`

    SELECT
        id,
        clinic_name,
        email,
        logo

    FROM sm_clinic

    WHERE id_sm_admin = (
        SELECT id

        FROM sm_admin

        WHERE sm_admin.id_sm_account = $1
        AND sm_admin.deleted_at IS NULL
    )
    AND deleted_at IS NULL

`