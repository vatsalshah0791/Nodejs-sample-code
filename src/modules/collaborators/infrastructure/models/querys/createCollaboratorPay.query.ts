'use strict'


export default /*sql*/`

    INSERT INTO sm_collaborator_pay (
        salary,
        commission,
        created_at,
        id_sm_collaborator,
        id_sm_clinic
    ) VALUES (
        $1,
        $2,
        DATE_TRUNC('MONTH', MAKE_DATE($3, $4, 1)) + INTERVAL '1 MONTH' - INTERVAL '1 DAY',
        $5,
        $6
    )
    RETURNING id

`