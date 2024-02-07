'use strict'


export default [
/*sql*/`

    INSERT INTO sm_account (
        first_name,
        last_name,
        username,
        real_password,
        old_password,
        id_app_role,
        id_app_language
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $4,
        1,
        1
    )
    RETURNING id

`,
/*sql*/`

    INSERT INTO sm_admin (
        email,
        company_name,
        plan_expiration_date,
        id_app_plan,
        id_app_gender,
        id_app_country,
        id_sm_account
    ) VALUES (
        $1,
        $2,
        CURRENT_TIMESTAMP + INTERVAL '3 days',
        1,
        $3,
        $4,
        $5
    )
    RETURNING id

`,
/*sql*/`

    INSERT INTO sm_verification_code (
        verification_code,
        id_sm_account
    ) VALUES (
        $1,
        $2
    )

`,
/*sql*/`

    INSERT INTO sm_access_token (
        access_token,
        id_sm_account
    ) VALUES (
        $1,
        $2
    )

`
]