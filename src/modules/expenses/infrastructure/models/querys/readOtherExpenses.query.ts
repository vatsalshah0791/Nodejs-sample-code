'use strict'


export default /*sql*/`

    SELECT
        sm_other_expense.id,
        sm_other_expense.other_expense,
		app_currency.currency_symbol,
        sm_other_expense.amount,
        sm_other_expense.is_available

    FROM sm_other_expense

	INNER JOIN sm_clinic
	ON sm_clinic.id = sm_other_expense.id_sm_clinic

	INNER JOIN app_currency
	ON app_currency.id = sm_clinic.id_app_currency

    WHERE sm_other_expense.id_sm_clinic = $1
    AND sm_other_expense.deleted_at IS NULL

`