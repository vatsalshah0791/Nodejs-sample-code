'use strict'


export default /*sql*/`

    SELECT
		sm_account.id,
        sm_account.first_name,
        sm_account.last_name,
        sm_account.username,
        TO_CHAR(sm_account.created_at::timestamp, 'YYYY-MM-DD') as as_created_at,
		sm_admin.email,
        sm_admin.phone_prefix,
		sm_admin.phone,
        sm_admin.company_name,
        TO_CHAR(sm_admin.birth_date::timestamp, 'YYYY-MM-DD') as as_birth_date,
        app_role.role_name,
        app_language.language_name,
        app_language.id AS as_id_app_language,
		app_gender.gender_name,
        app_gender.id AS as_id_app_gender,
		app_country.country_name,
        app_country.id AS as_id_app_country

    FROM sm_account

	INNER JOIN sm_admin
	ON sm_admin.id_sm_account = sm_account.id

    INNER JOIN app_role
    ON app_role.id = sm_account.id_app_role

    INNER JOIN app_language
    ON app_language.id = sm_account.id_app_language

	INNER JOIN app_gender
	ON app_gender.id = sm_admin.id_app_gender

	INNER JOIN app_country
	ON app_country.id = sm_admin.id_app_country

    WHERE sm_account.id = $1
    AND sm_account.deleted_at IS NULL

`