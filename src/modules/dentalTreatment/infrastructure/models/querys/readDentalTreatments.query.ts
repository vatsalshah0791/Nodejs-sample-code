'use strict'


export default /*sql*/`

    SELECT
        sm_dental_treatment.id,
        sm_dental_treatment.treatment_name,
        sm_dental_treatment.price,
        app_currency.currency_symbol

    FROM sm_dental_treatment

    INNER JOIN sm_clinic
    ON sm_clinic.id = sm_dental_treatment.id_sm_clinic

    INNER JOIN app_currency
    ON app_currency.id = sm_clinic.id_app_currency

    WHERE sm_dental_treatment.id_sm_clinic = $1
    AND sm_dental_treatment.deleted_at IS NULL
    AND sm_clinic.deleted_at IS NULL

`