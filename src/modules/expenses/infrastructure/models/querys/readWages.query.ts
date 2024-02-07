'use strict'


export default /*sql*/`

    SELECT
    	sm_account.first_name || ' ' || sm_account.last_name as as_name,
    	app_currency.currency_symbol,
    	salary

    FROM sm_collaborator_sm_clinic

    INNER JOIN sm_collaborator
    ON sm_collaborator.id = sm_collaborator_sm_clinic.id_sm_collaborator

    INNER JOIN sm_account
    ON sm_account.id = sm_collaborator.id_sm_account

    INNER JOIN sm_clinic
    ON sm_clinic.id = sm_collaborator_sm_clinic.id_sm_clinic

    INNER JOIN app_currency
    ON app_currency.id = sm_clinic.id_app_currency

    WHERE sm_collaborator_sm_clinic.id_sm_clinic = $1
    AND sm_collaborator_sm_clinic.deleted_at IS NULL

`