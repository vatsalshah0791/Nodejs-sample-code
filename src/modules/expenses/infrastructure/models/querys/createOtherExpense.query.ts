'use strict'


export default /*sql*/`

    INSERT INTO sm_other_expense (
        other_expense,
        amount,
        is_available,
        id_sm_clinic
    ) VALUES (
        $1,
        $2,
        $3,
        $4
    )
    RETURNING id

`