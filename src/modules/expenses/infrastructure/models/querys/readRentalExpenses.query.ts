'use strict'


export default /*sql*/`

    SELECT
        sm_rental_expense.id,
        sm_rental_expense.rental_name,
		app_currency.currency_symbol,
        sm_rental_expense.amount,
        sm_rental_expense.is_available

    FROM sm_rental_expense

	INNER JOIN sm_clinic
	ON sm_clinic.id = sm_rental_expense.id_sm_clinic

	INNER JOIN app_currency
	ON app_currency.id = sm_clinic.id_app_currency

    WHERE sm_rental_expense.id_sm_clinic = $1
    AND sm_rental_expense.deleted_at IS NULL

`