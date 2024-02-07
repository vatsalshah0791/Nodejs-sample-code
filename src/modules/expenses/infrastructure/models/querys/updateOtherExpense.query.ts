'use strict'


export default /*sql*/`

    UPDATE sm_other_expense

    SET
        other_expense = $1,
        amount = $2,
        is_available = $3

    WHERE id = $4
    AND deleted_at IS NULL

`