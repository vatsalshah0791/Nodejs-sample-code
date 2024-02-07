'use strict'


export default /*sql*/`

    SELECT
        id,
        clinic_name,
        email,
        phone_prefix,
        phone,
        full_address,
        logo,
        id_app_country,
        id_app_time_zone,
        id_app_currency

    FROM sm_clinic

    WHERE id = $1
    AND deleted_at IS NULL

`