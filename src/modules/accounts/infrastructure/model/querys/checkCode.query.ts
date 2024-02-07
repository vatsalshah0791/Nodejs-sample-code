'use strict'


export default /*sql*/`

    SELECT id

    FROM sm_code

    WHERE code = $1
    AND id_sm_account = $2
    AND deleted_at IS NULL
    AND NOW() <= created_at + INTERVAL '15 minutes'

`