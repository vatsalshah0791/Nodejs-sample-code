'use strict'


export default /*sql*/`

    INSERT INTO sm_dental_treatment (
        treatment_name,
        price,
        id_sm_clinic
    ) VALUES (
        $1,
        $2,
        $3
    )
    RETURNING id

`