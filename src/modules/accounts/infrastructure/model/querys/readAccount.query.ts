'use strict'


export default /*sql*/`

    SELECT
        sm_account.first_name,
        sm_account.last_name,
        sm_account.username,
        sm_account.photo,
        app_role.role_name,
        app_language.language_name

    FROM sm_account

    INNER JOIN app_role
    ON app_role.id = sm_account.id_app_role

    INNER JOIN app_language
    ON app_language.id = sm_account.id_app_language

    WHERE sm_account.id = $1
    AND sm_account.deleted_at IS NULL

`