'use strict'


export default /*sql*/`

    SELECT
        sm_service_expense.id,
        sm_service_expense.service_name,
		app_currency.currency_symbol,
        sm_service_expense.amount,
        sm_service_expense.is_available

    FROM sm_service_expense

	INNER JOIN sm_clinic
	ON sm_clinic.id = sm_service_expense.id_sm_clinic

	INNER JOIN app_currency
	ON app_currency.id = sm_clinic.id_app_currency

    WHERE sm_service_expense.id_sm_clinic = $1
    AND sm_service_expense.deleted_at IS NULL

`