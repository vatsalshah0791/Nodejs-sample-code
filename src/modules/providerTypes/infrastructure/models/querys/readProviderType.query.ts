'use strict'


export default /*sql*/`

    SELECT
        id,
        provider_type

    FROM app_provider_type

    WHERE deleted_at IS NULL

`