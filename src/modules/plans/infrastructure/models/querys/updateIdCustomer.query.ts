'use strict'


export default /*sql*/`

    UPDATE sm_admin

    SET customer_id = $1

    WHERE id_sm_account = $2
    AND deleted_at IS NULL

`