'use strict'


export default /*sql*/`

    SELECT
    	sm_provider.id AS as_id_provider,
    	sm_provider.title,
    	app_currency.currency_symbol,
        COALESCE(SUM(sm_bill_item.amount * sm_bill_item.unit_price), 0) AS total

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
    AND sm_provider.id_app_provider_type = $2
    AND EXTRACT(WEEK FROM sm_bill.date_bill) = $3
    AND EXTRACT(MONTH FROM sm_bill.date_bill) = $4
    AND EXTRACT(YEAR FROM sm_bill.date_bill) = $5
    AND sm_bill.deleted_at IS NULL

    GROUP BY
        as_id_provider,
    	app_currency.currency_symbol

`