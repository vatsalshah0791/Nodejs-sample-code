'use strict'


export default /*sql*/`

    INSERT INTO sm_collaborator_sm_clinic (
        salary,
        commission,
        id_sm_collaborator,
        id_sm_clinic
    ) VALUES (
        $1,
        $2,
        $3,
        $4
    )
    RETURNING id

`