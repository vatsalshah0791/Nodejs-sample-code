'use strict'


export default /*sql*/`

    SELECT
        sm_pay.id,
        app_currency.currency_symbol,
        sm_pay.amount,
        sm_dental_treatment.treatment_name,
        app_patient_payment_method.payment_method,
        TO_CHAR(
            sm_pay.created_at::timestamp AT TIME ZONE app_time_zone.time_zone,
            'YYYY-MM-DD'
        ) AS as_created_at

    FROM sm_pay

    INNER JOIN sm_patient_dental_treatment
    ON sm_patient_dental_treatment.id = sm_pay.id_sm_patient_dental_treatment

    INNER JOIN sm_dental_treatment
    ON sm_dental_treatment.id = sm_patient_dental_treatment.id_sm_dental_treatment

    INNER JOIN app_patient_payment_method
    ON app_patient_payment_method.id = sm_pay.id_app_patient_payment_method

    INNER JOIN sm_clinic
    ON sm_clinic.id = sm_dental_treatment.id_sm_clinic

    INNER JOIN app_currency
    ON app_currency.id = sm_clinic.id_app_currency

    INNER JOIN app_time_zone
    ON app_time_zone.id = sm_clinic.id_app_time_zone

    WHERE sm_pay.id_sm_patient_dental_treatment IN (
        SELECT id

        FROM sm_patient_dental_treatment

        WHERE id_sm_patient = $1
        AND isDraft = false
        AND deleted_at IS NULL
    )
    AND sm_pay.deleted_at IS NULL

`