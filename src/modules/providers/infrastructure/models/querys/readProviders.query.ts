'use strict'


export default /*sql*/ `

    SELECT
        sm_provider.id,
        title,
        email,
        full_address,
        phone_prefix,
        phone,
        website,
        app_provider_type.provider_type,
        app_provider_type.id as as_id_provider_type

    FROM sm_provider

    INNER JOIN app_provider_type
    ON app_provider_type.id = sm_provider.id_app_provider_type

    WHERE sm_provider.id_sm_clinic = $1
    AND sm_provider.deleted_at IS NULL

`