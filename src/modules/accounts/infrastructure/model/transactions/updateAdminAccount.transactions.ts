'use strict'


export default [
/*sql*/`

    UPDATE sm_account

    SET
        first_name = $1,
        last_name = $2

    WHERE id = $3
    AND deleted_at IS NULL

`,
/*sql*/`

    UPDATE sm_admin

    SET
        phone_prefix = $1,
        phone = $2,
        company_name = $3,
        birth_date = $4,
        id_app_gender = $5,
        id_app_country = $6

    WHERE id_sm_account = $7
    AND deleted_at IS NULL

`
]