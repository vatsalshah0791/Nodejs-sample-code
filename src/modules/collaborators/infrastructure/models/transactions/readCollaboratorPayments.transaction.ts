'use strict'

export default [
/*sql*/`

    SELECT
		app_time_zone.time_zone,
		app_currency.currency_symbol

    FROM sm_clinic

    INNER JOIN app_time_zone
    ON app_time_zone.id = sm_clinic.id_app_time_zone

	INNER JOIN app_currency
	ON app_currency.id = sm_clinic.id_app_currency

    WHERE sm_clinic.id = $1
    AND sm_clinic.deleted_at IS NULL

`,
/*sql*/`

    SELECT
    	sm_collaborator_pay.id,
    	sm_collaborator_pay.salary,
    	(
    		SELECT COALESCE(
    			SUM(amount * sm_collaborator_pay.commission) / 100,
    			0
    		)

    		FROM sm_pay

    		WHERE id_sm_collaborator = $1
    		AND deleted_at IS NULL
    		AND EXTRACT(YEAR FROM created_at AT TIME ZONE $2) = EXTRACT(YEAR FROM sm_collaborator_pay.created_at)
    		AND EXTRACT(MONTH FROM created_at AT TIME ZONE $2) = EXTRACT(MONTH from sm_collaborator_pay.created_at)
    	) as as_commission,
    	EXTRACT(MONTH FROM sm_collaborator_pay.created_at) as as_month

    FROM sm_collaborator_pay

    WHERE sm_collaborator_pay.id_sm_collaborator = $1
    AND sm_collaborator_pay.id_sm_clinic = $3
    AND EXTRACT(YEAR FROM sm_collaborator_pay.created_at) = $4
    AND sm_collaborator_pay.deleted_at IS NULL

	ORDER BY sm_collaborator_pay.created_at DESC

`
]