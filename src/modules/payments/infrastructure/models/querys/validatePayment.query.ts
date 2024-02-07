'use strict'


export default /*sql*/`

    SELECT
        sm_patient_dental_treatment.total,
        COALESCE(SUM(sm_pay.amount), 0) AS total_pagado

    FROM sm_patient_dental_treatment

    LEFT JOIN sm_pay
    ON sm_pay.id_sm_patient_dental_treatment = sm_patient_dental_treatment.id

    WHERE sm_patient_dental_treatment.id = $1
    AND sm_patient_dental_treatment.deleted_at IS NULL
    AND sm_pay.deleted_at IS NULL

    GROUP BY sm_patient_dental_treatment.id

`