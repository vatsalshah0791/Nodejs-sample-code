'use strict'


export default /*sql*/`

    SELECT
        sm_account.id,
        sm_account.first_name,
        sm_account.last_name,
        sm_account.username,
        TO_CHAR(sm_account.created_at::timestamp, 'YYYY-MM-DD') as as_created_at,
        sm_collaborator.email,
        sm_collaborator.phone_prefix,
        sm_collaborator.phone,
        sm_collaborator.full_address,
        TO_CHAR(sm_collaborator.birth_date::timestamp, 'YYYY-MM-DD') as as_birth_date,
        sm_collaborator.emergency_phone_prefix,
        sm_collaborator.emergency_phone,
        sm_collaborator.emergency_name,
        app_role.role_name,
        app_language.language_name,
        app_language.id AS as_id_app_language,
        app_gender.gender_name,
        app_gender.id AS as_id_app_gender,
		app_country.country_name,
        app_country.id AS as_id_app_country

    FROM sm_account

    INNER JOIN sm_collaborator
    ON sm_collaborator.id_sm_account = sm_account.id

    INNER JOIN app_role
    ON app_role.id = sm_account.id_app_role

    INNER JOIN app_language
    ON app_language.id = sm_account.id_app_language

    INNER JOIN app_gender
	ON app_gender.id = sm_collaborator.id_app_gender

	INNER JOIN app_country
	ON app_country.id = sm_collaborator.id_app_country

    WHERE sm_account.id = $1
    AND sm_account.deleted_at IS NULL

`