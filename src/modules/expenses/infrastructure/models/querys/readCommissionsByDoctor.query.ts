'use strict'


export default /*sql*/`

    SELECT
		sm_pay.id,
		sm_dental_treatment.treatment_name,
		'Dr. ' || sm_account.first_name || ' ' || sm_account.last_name as as_doctor,
		sm_pay.created_at,
		app_currency.currency_symbol,
		SUM(COALESCE((sm_pay.commission / NULLIF(sm_pay.amount, 0)) * 100, 0)) AS as_percentage

	FROM sm_pay

	INNER JOIN sm_collaborator
	ON sm_collaborator.id = sm_pay.id_sm_collaborator

	INNER JOIN sm_account
	ON sm_account.id = sm_collaborator.id_sm_account

	INNER JOIN sm_patient_dental_treatment
	ON sm_patient_dental_treatment.id = sm_pay.id_sm_patient_dental_treatment

	INNER JOIN sm_patient
	ON sm_patient.id = sm_patient_dental_treatment.id_sm_patient

	INNER JOIN sm_clinic
	ON sm_clinic.id = sm_patient.id_sm_clinic

	INNER JOIN app_currency
	ON app_currency.id = sm_clinic.id_app_currency

	INNER JOIN sm_dental_treatment
	ON sm_dental_treatment.id = sm_patient_dental_treatment.id_sm_dental_treatment

	WHERE sm_clinic.id = $1
	AND sm_clinic.deleted_at IS NULL
    AND sm_pay.id_sm_collaborator = $2
	AND sm_pay.deleted_at IS NULL

	GROUP BY
		sm_pay.id,
		sm_dental_treatment.treatment_name,
		as_doctor,
		app_currency.currency_symbol

`