'use strict'


export default /*sql*/`

    UPDATE sm_service_expense

    SET
        service_name = $1,
        amount = $2,
        is_available = $3

    WHERE id = $4
    AND deleted_at IS NULL

`