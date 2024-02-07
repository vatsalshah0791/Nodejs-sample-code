'use strict'


export default [
/*sql*/`

    INSERT INTO sm_clinic (
        clinic_name,
        email,
        phone_prefix,
        phone,
        full_address,
        logo,
        id_app_country,
        id_app_time_zone,
        id_app_currency,
        id_sm_admin
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
        (
            SELECT id

            FROM sm_admin

            WHERE sm_admin.id_sm_account = $10
            AND sm_admin.deleted_at IS NULL
        )
    )
    RETURNING id

`,
/*sql*/`

    INSERT INTO sm_admin_notification (
        title,
        content,
        id_sm_admin
    ) VALUES (
        $1,
        $2,
        (
            SELECT id

            FROM sm_admin

            WHERE sm_admin.id_sm_account = $3
            AND sm_admin.deleted_at IS NULL
        )
    )

`
]