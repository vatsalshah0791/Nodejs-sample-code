'use strict'


export default /*sql*/`

    SELECT
        sm_patient_dental_treatment.id,
        sm_dental_treatment.treatment_name,
        sm_patient_dental_treatment.dental_piece,
        app_currency.currency_symbol,
        sm_patient_dental_treatment.price,
        sm_patient_dental_treatment.discount,
        sm_patient_dental_treatment.total,
        COALESCE(SUM(sm_pay.amount), 0) AS total_pagado,
        sm_patient_dental_treatment.status,
        TO_CHAR(
            sm_patient_dental_treatment.created_at::timestamp AT TIME ZONE app_time_zone.time_zone,
            'YYYY-MM-DD'
        ) as as_created_at,
        TO_CHAR(
            sm_patient_dental_treatment.updated_at::timestamp AT TIME ZONE app_time_zone.time_zone,
            'YYYY-MM-DD'
        ) as as_updated_at

    FROM sm_patient_dental_treatment

    INNER JOIN sm_dental_treatment
    ON sm_dental_treatment.id = sm_patient_dental_treatment.id_sm_dental_treatment

    INNER JOIN sm_clinic
    ON sm_clinic.id = sm_dental_treatment.id_sm_clinic

    INNER JOIN app_time_zone
    ON app_time_zone.id = sm_clinic.id_app_time_zone

	INNER JOIN app_currency
    ON app_currency.id = sm_clinic.id_app_currency

    LEFT JOIN sm_pay
    ON sm_pay.id_sm_patient_dental_treatment = sm_patient_dental_treatment.id

    WHERE sm_patient_dental_treatment.isDraft = false
    AND sm_patient_dental_treatment.deleted_at IS NULL
    AND sm_patient_dental_treatment.id_sm_patient = $1
    AND sm_pay.deleted_at IS NULL

    GROUP BY
        sm_patient_dental_treatment.id,
        sm_dental_treatment.treatment_name,
        app_time_zone.time_zone,
        app_currency.currency_symbol

`