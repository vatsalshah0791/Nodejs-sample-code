'use strict'


export default [
/*sql*/`

    INSERT INTO sm_account (
        first_name,
        last_name,
        username,
        real_password,
        old_password,
        is_verified,
        photo,
        id_app_role,
        id_app_language
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $4,
        true,
        $5,
        2,
        1
    )
    RETURNING id

`,
/*sql*/`

    INSERT INTO sm_patient (
        email,
        phone_prefix,
        phone,
        full_address,
        workplace,
        recommended_by,
        birth_date,
        emergency_phone_prefix,
        emergency_phone,
        emergency_name,
        id_app_gender,
        id_app_country,
        id_sm_account,
        id_sm_collaborator,
        id_sm_clinic
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15
    )
    RETURNING id

`,
/*sql*/`

    INSERT INTO sm_record (id_sm_patient)
    VALUES ($1)

`
]