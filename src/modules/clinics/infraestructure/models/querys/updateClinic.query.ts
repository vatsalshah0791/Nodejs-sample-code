'use strict'


export default /*sql*/`

    UPDATE sm_clinic

    SET
        clinic_name = $1,
        email = $2,
        phone_prefix = $3,
        phone = $4,
        full_address = $5,
        id_app_country = $6,
        id_app_currency = $7,
        id_app_time_zone = $8

    WHERE id = $9
    AND deleted_at IS NULL

`