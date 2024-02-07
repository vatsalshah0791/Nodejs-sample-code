'use strict'


export default /*sql*/`

    UPDATE sm_rental_expense

    SET
        rental_name = $1,
        amount = $2,
        is_available = $3

    WHERE id = $4
    AND deleted_at IS NULL

`