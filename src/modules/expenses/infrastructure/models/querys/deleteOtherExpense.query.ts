'use strict'


export default /*sql*/`

    UPDATE sm_other_expense

    SET deleted_at = NOW()

    WHERE id = $1
    AND deleted_at IS NULL

`