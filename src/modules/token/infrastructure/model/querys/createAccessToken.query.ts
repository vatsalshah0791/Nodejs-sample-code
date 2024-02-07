'use strict'


export default /*sql*/`

    INSERT INTO sm_access_token (
        access_token,
        id_sm_account
    ) VALUES (
        $1,
        $2
    )

`