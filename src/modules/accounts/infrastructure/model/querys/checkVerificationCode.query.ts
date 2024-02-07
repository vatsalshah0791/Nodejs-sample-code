'use strict'


export default /*sql*/`

    SELECT id

    FROM sm_verification_code

    WHERE verification_code = $1
    AND id_sm_account = $2
    AND deleted_at IS NULL
    AND NOW() <= created_at + INTERVAL '6 hours'

`