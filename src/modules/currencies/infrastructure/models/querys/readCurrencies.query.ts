'use strict'


export default /*sql*/`

    SELECT
        id,
        currency_name,
        currency_symbol

    FROM app_currency

    WHERE deleted_at IS NULL

`