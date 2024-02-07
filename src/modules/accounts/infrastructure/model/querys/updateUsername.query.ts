'use strict'


export default /*sql*/`

    UPDATE sm_account

    SET username = $1

    WHERE id = $2
    AND deleted_at IS NULL

`