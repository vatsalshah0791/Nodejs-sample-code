'use strict'


export default /*sql*/`

    SELECT
        sm_collaborator.id as as_id_sm_collaborator,
        sm_account.first_name,
        sm_account.last_name,
        sm_account.username,
        sm_collaborator.email,
        sm_collaborator.phone_prefix,
        sm_collaborator.phone,
        sm_account.is_active,
        sm_account.photo,
        app_role.role_name

    FROM sm_collaborator

    INNER JOIN sm_account
    ON sm_account.id = sm_collaborator.id_sm_account

    INNER JOIN app_role
    ON app_role.id = sm_account.id_app_role

    WHERE sm_account.id_app_role = ANY($1)
    AND sm_account.deleted_at IS NULL
    AND sm_collaborator.deleted_at IS NULL
    AND sm_collaborator.id_sm_admin = (
        SELECT id

        FROM sm_admin

        WHERE sm_admin.id_sm_account = $2
        AND sm_admin.deleted_at IS NULL
    )

`