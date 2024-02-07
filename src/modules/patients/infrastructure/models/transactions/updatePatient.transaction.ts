'use strict'


export default [
/*sql*/`

    UPDATE sm_account

    SET
        first_name = $1,
        last_name = $2

    WHERE id = (
        SELECT id_sm_account

        FROM sm_patient

        WHERE sm_patient.id = $3
        AND sm_patient.deleted_at IS NULL
    )
    AND deleted_at IS NULL

`,
/*sql*/`

    UPDATE sm_patient

    SET
        email = $1,
        phone_prefix = $2,
        phone = $3,
        full_address = $4,
        workplace = $5,
        recommended_by = $6,
        birth_date = $7,
        emergency_phone_prefix = $8,
        emergency_phone = $9,
        emergency_name = $10,
        id_app_gender = $11,
        id_app_country = $12,
        id_sm_collaborator = $13

    WHERE id = $14
    AND deleted_at IS NULL

`
]