'use strict'


export default /*sql*/`

    SELECT sm_account.photo

    FROM sm_patient

    INNER JOIN sm_account
    ON sm_account.id = sm_patient.id_sm_account

    WHERE sm_patient.id = $1
    AND sm_patient.deleted_at IS NULL

`