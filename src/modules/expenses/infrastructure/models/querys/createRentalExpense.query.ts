'use strict'


export default /*sql*/`

    INSERT INTO sm_rental_expense (
        rental_name,
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