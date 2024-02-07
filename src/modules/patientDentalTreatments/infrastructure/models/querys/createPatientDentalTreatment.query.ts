'use strict'


export default /*sql*/`

    INSERT INTO sm_patient_dental_treatment (
        dental_piece,
        price,
        discount,
        isDraft,
        id_sm_dental_treatment,
        id_sm_patient
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
    )
    RETURNING id

`