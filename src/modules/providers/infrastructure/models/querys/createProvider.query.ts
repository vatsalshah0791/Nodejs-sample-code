'use strict'


export default /*sql*/`

    INSERT INTO sm_provider (
        title,
        email,
        full_address,
        phone_prefix,
        phone,
        website,
        id_app_provider_type,
        id_sm_clinic
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
    )
    RETURNING id

`