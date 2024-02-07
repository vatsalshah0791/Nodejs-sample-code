'use strict'


export default /*sql*/`

    UPDATE sm_account

    SET id_app_language = $1

    WHERE id = $2
    AND deleted_at IS NULL

`