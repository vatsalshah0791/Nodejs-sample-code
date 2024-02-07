'use strict'


export default /*sql*/`

SELECT
        EXTRACT(WEEK FROM sm_pay.created_at) AS as_week,
    	app_currency.currency_symbol,
    	SUM(amount) as as_sum_amount,
		TO_CHAR(
			CASE
				WHEN EXTRACT(MONTH FROM date_trunc('week', sm_pay.created_at)) = $2
				THEN date_trunc('week', sm_pay.created_at)
				ELSE date_trunc('month', sm_pay.created_at)
				END,
    		'Mon-DD'
		) || ' - ' ||
		TO_CHAR(
			CASE
				WHEN EXTRACT(MONTH FROM (date_trunc('week', sm_pay.created_at) + INTERVAL '6 days')) = $2
				THEN date_trunc('week', sm_pay.created_at) + INTERVAL '6 days'
				ELSE date_trunc('month', sm_pay.created_at) + INTERVAL '1 MONTH - 1 DAY'
				END,
    		'Mon-DD'
		) AS as_label

    FROM sm_pay

    INNER JOIN sm_patient_dental_treatment
    ON sm_patient_dental_treatment.id = sm_pay.id_sm_patient_dental_treatment

    INNER JOIN sm_patient
    ON sm_patient.id = sm_patient_dental_treatment.id_sm_patient

    INNER JOIN sm_clinic
    ON sm_clinic.id = sm_patient.id_sm_clinic

    INNER JOIN app_currency
    ON app_currency.id = sm_clinic.id_app_currency

    WHERE sm_patient.id_sm_clinic = $1
    AND EXTRACT(MONTH FROM sm_pay.created_at) = $2
    AND EXTRACT(YEAR FROM sm_pay.created_at) = $3
    AND sm_pay.deleted_at IS NULL

    GROUP BY
		as_week,
		app_currency.currency_symbol,
		as_label

`