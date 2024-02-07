'use strict'


export default /*sql*/`

    SELECT
        id,
        payment_method

    FROM app_patient_payment_method

    WHERE deleted_at IS NULL

`