'use strict'


export default /*sql*/`

    SELECT sm_collaborator_pay.id

    FROM sm_collaborator_pay

    WHERE EXTRACT(MONTH FROM sm_collaborator_pay.created_at) = $1
    AND EXTRACT(YEAR FROM sm_collaborator_pay.created_at) = $2
    AND sm_collaborator_pay.id_sm_collaborator = $3
    AND sm_collaborator_pay.id_sm_clinic = $4
    AND sm_collaborator_pay.deleted_at IS NULL

`