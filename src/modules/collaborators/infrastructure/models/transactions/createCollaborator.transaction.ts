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
        $6,
        1
    )
    RETURNING id

`,
/*sql*/`

    INSERT INTO sm_collaborator (
        email,
        phone_prefix,
        phone,
        full_address,
        birth_date,
        emergency_phone_prefix,
        emergency_phone,
        emergency_name,
        id_app_gender,
        id_app_country,
        id_sm_account,
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
        $10,
        $11,
        (
            SELECT id

            FROM sm_admin

            WHERE sm_admin.id_sm_account = $12
            AND sm_admin.deleted_at IS NULL
        )
    )
    RETURNING id

`,
/*sql*/`

    INSERT INTO sm_permission (
        can_read,
        can_write,
        id_sm_collaborator,
        id_app_section
    ) VALUES (
        true,
        true,
        $1,
        3
    )

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