'use strict'


export default /*sql*/`

    UPDATE sm_rental_expense

    SET deleted_at = NOW()

    WHERE id = $1
    AND deleted_at IS NULL

`