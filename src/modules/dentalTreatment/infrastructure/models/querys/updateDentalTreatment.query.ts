'use strict'


export default /*sql*/`

    UPDATE sm_dental_treatment

    SET
        treatment_name = $1,
        price = $2

    WHERE id = $3
    AND deleted_at IS NULL

`