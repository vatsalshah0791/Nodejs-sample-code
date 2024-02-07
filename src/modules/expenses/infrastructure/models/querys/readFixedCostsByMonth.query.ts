'use strict'


export default /*sql*/`

    SELECT
	(
		SELECT app_currency.currency_symbol

		FROM sm_clinic

		INNER JOIN app_currency
		ON app_currency.id = sm_clinic.id_app_currency

		WHERE sm_clinic.id = $1
		AND sm_clinic.deleted_at IS NULL
	) AS as_currency,
    (
		SELECT COALESCE(SUM(amount), 0)

		FROM sm_rental_expense

		WHERE id_sm_clinic = $1
		AND is_available = true
		AND deleted_at IS NULL
	) AS as_rental,
	(
		SELECT COALESCE(SUM(salary), 0)

		FROM sm_collaborator_sm_clinic

		WHERE id_sm_clinic = $1
		AND deleted_at IS NULL
	) AS as_wages,
    (
		SELECT COALESCE(SUM(amount), 0)

		FROM sm_service_expense

		WHERE id_sm_clinic = $1
		AND is_available = true
		AND deleted_at IS NULL
	) AS as_service,
	(
		SELECT COALESCE(SUM(amount), 0)

		FROM sm_other_expense

		WHERE id_sm_clinic = $1
		AND is_available = true
		AND deleted_at IS NULL
	) AS as_other

`