'use strict'


export default /*sql*/`

    SELECT
        sm_pay.id,
        app_currency.currency_symbol,
        sm_pay.amount,
        app_patient_payment_method.payment_method,
        sm_account.first_name || ' ' || sm_account.last_name as as_doctor,
        TO_CHAR(
            sm_pay.created_at::timestamp AT TIME ZONE app_time_zone.time_zone,
            'YYYY-MM-DD'
        ) AS as_created_at

    FROM sm_pay

    INNER JOIN app_patient_payment_method
    ON app_patient_payment_method.id = sm_pay.id_app_patient_payment_method

    INNER JOIN sm_patient_dental_treatment
    ON sm_patient_dental_treatment.id = sm_pay.id_sm_patient_dental_treatment

    INNER JOIN sm_dental_treatment
    ON sm_dental_treatment.id = sm_patient_dental_treatment.id_sm_dental_treatment

    INNER JOIN sm_clinic
    ON sm_clinic.id = sm_dental_treatment.id_sm_clinic

    INNER JOIN app_currency
    ON app_currency.id = sm_clinic.id_app_currency

    INNER JOIN app_time_zone
    ON app_time_zone.id = sm_clinic.id_app_time_zone

    INNER JOIN sm_collaborator
    ON sm_collaborator.id = sm_pay.id_sm_collaborator

	INNER JOIN sm_account
    ON sm_account.id = sm_collaborator.id_sm_account

    WHERE sm_pay.id_sm_patient_dental_treatment = $1
    AND sm_pay.deleted_at IS NULL

`