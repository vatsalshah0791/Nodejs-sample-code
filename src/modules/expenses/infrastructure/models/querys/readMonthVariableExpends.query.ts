'use strict'


export default /*sql*/`

SELECT
    	app_currency.currency_symbol,
        COALESCE(SUM(
			CASE
				WHEN sm_provider.id_app_provider_type = 1
				THEN sm_bill_item.amount * sm_bill_item.unit_price
				ELSE 0
			END
		), 0) AS as_warehouse,
		COALESCE(SUM(
			CASE
				WHEN sm_provider.id_app_provider_type = 2
				THEN sm_bill_item.amount * sm_bill_item.unit_price
				ELSE 0
			END
		), 0) AS as_laboratory,
		COALESCE(SUM(
			CASE
				WHEN sm_provider.id_app_provider_type = 3
				THEN sm_bill_item.amount * sm_bill_item.unit_price
				ELSE 0
			END
		), 0) AS as_other,
		(
			SELECT
			SUM(COALESCE((sm_pay.commission * NULLIF(sm_pay.amount, 0)) / 100, 0)) AS as_percentage

			FROM sm_pay

			INNER JOIN sm_patient_dental_treatment
			ON sm_patient_dental_treatment.id = sm_pay.id_sm_patient_dental_treatment

			INNER JOIN sm_patient
			ON sm_patient.id = sm_patient_dental_treatment.id_sm_patient

			WHERE sm_patient.id_sm_clinic = $1
			AND EXTRACT(MONTH FROM sm_pay.created_at) = $2
    		AND EXTRACT(YEAR FROM sm_pay.created_at) = $3
			AND sm_pay.deleted_at IS NULL
		) AS as_commission

    FROM sm_bill

    INNER JOIN sm_provider
    ON sm_provider.id=sm_bill.id_sm_provider

    INNER JOIN sm_clinic
    ON sm_clinic.id=sm_bill.id_sm_clinic

    INNER JOIN app_currency
    ON app_currency.id=sm_clinic.id_app_currency

    LEFT JOIN sm_bill_item
    ON sm_bill_item.id_sm_bill=sm_bill.id

    WHERE sm_bill.id_sm_clinic = $1
	AND EXTRACT(MONTH FROM sm_bill.date_bill) = $2
    AND EXTRACT(YEAR FROM sm_bill.date_bill) = $3
    AND sm_bill.deleted_at IS NULL

    GROUP BY app_currency.currency_symbol

`