'use strict'


export default /*sql*/`

    UPDATE sm_account

    SET photo = $1

    WHERE id = (
        SELECT id_sm_account

        FROM sm_patient

        WHERE sm_patient.id = $2
        AND sm_patient.deleted_at IS NULL
    )

`