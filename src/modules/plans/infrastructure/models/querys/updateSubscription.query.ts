'use strict'


export default /*sql*/`

    UPDATE sm_admin

    SET
        subscription_id = $1,
        id_app_plan = $2,
        plan_expiration_date = NOW() + INTERVAL '5 days'

    WHERE id_sm_account = $3
    AND deleted_at IS NULL

`