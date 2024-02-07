'use strict'


export default /*sql*/`

    UPDATE sm_provider

    SET
        title = $1,
        email = $2,
        full_address = $3,
        phone_prefix = $4,
        phone = $5,
        website = $6,
        id_app_provider_type = $7

    WHERE id = $8
    AND deleted_at IS NULL

`