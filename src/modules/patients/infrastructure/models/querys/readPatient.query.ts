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
        sm_patient.workplace,
        sm_patient.recommended_by,
        TO_CHAR(sm_patient.birth_date::timestamp, 'YYYY-MM-DD') as as_birth_date,
        sm_patient.emergency_phone_prefix,
        sm_patient.emergency_phone,
        sm_patient.emergency_name,
        TO_CHAR(sm_patient.created_at::timestamp, 'YYYY-MM-DD') as as_created_at,
        app_gender.gender_name,
        app_gender.id as as_id_app_gender,
        app_country.country_name,
        app_country.id as as_id_app_country,
        doctor.first_name || ' ' || doctor.last_name as as_doctor_name,
		doctor.username as as_doctor_username,
        sm_collaborator.id as as_id_sm_collaborator,
        sm_patient.id_sm_clinic as as_id_sm_clinic


    FROM sm_patient

    INNER JOIN sm_account
    ON sm_account.id = sm_patient.id_sm_account

    INNER JOIN app_gender
    ON app_gender.id = sm_patient.id_app_gender

    INNER JOIN app_country
    ON app_country.id = sm_patient.id_app_country

    INNER JOIN sm_collaborator
    ON sm_collaborator.id = sm_patient.id_sm_collaborator

    INNER JOIN sm_account doctor
    ON doctor.id = sm_collaborator.id_sm_account

    WHERE sm_patient.id = $1
    AND sm_patient.deleted_at IS NULL

`