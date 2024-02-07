'use strict'


export default /*sql*/`

    SELECT
    	sm_collaborator.id,
    	sm_account.first_name,
        sm_account.last_name,
        sm_account.username,
        sm_account.photo,
        sm_account.is_active,
        sm_collaborator.email,
        sm_collaborator.phone_prefix,
        sm_collaborator.phone,
        app_role.role_name

    FROM sm_collaborator

    INNER JOIN sm_account
    ON sm_account.id = sm_collaborator.id_sm_account

    INNER JOIN app_role
    ON app_role.id = sm_account.id_app_role

    WHERE sm_collaborator.deleted_at IS NULL
    AND sm_collaborator.id_sm_admin = (
    	SELECT sm_admin.id as as_id_sm_admin

    	FROM sm_clinic

    	INNER JOIN sm_admin
        ON sm_admin.id = sm_clinic.id_sm_admin

    	WHERE sm_clinic.id = $1
    	AND sm_clinic.deleted_at IS NULL
    	AND sm_admin.deleted_at IS NULL
    )
    AND sm_account.id_app_role = ANY($2)
    AND sm_account.deleted_at IS NULL
    AND sm_collaborator.id NOT IN (
    	SELECT id_sm_collaborator

    	FROM sm_collaborator_sm_clinic

    	WHERE id_sm_clinic = $1
    	AND deleted_at IS NULL
    )

`