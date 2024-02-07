'use strict'


export default /*sql*/`

    SELECT
        sm_patient.id,
        sm_account.first_name,
        sm_account.last_name,
        sm_account.username,
        sm_account.photo,
        sm_patient.email,
        sm_patient.phone_prefix,
        sm_patient.phone,
        sm_patient.full_address,
        TO_CHAR(sm_patient.created_at::timestamp, 'YYYY-MM-DD') as as_created_at,
        app_gender.gender_name,
        app_country.country_name

    FROM sm_patient

    INNER JOIN sm_account
    ON sm_account.id = sm_patient.id_sm_account

    INNER JOIN app_country
    ON app_country.id = sm_patient.id_app_country

    INNER JOIN app_gender
    ON app_gender.id = sm_patient.id_app_gender

    WHERE sm_patient.id_sm_clinic = $1
    AND sm_patient.deleted_at IS NULL

`