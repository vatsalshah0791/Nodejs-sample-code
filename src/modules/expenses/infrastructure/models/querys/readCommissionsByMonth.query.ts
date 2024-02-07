'use strict'


export default /*sql*/`

	SELECT
		sm_collaborator.id,
		sm_account.photo,
		sm_account.first_name || ' ' || sm_account.last_name as as_doctor,
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

	WHERE sm_clinic.id = $1
	AND sm_clinic.deleted_at IS NULL
	AND EXTRACT(MONTH FROM sm_pay.created_at) = $2
    AND EXTRACT(YEAR FROM sm_pay.created_at) = $3
	AND sm_pay.deleted_at IS NULL

	GROUP BY
		sm_collaborator.id,
		sm_account.photo,
		as_doctor,
		app_currency.currency_symbol

`