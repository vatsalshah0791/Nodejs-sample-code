'use strict'


export default /*sql*/`

    UPDATE sm_account

    SET photo = $1

    WHERE id = $2
    AND deleted_at IS NULL

`