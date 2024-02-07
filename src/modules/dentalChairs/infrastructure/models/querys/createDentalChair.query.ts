'use strict'


export default /*sql*/`

    INSERT INTO sm_dental_chair (
        chair_name,
        id_sm_clinic
    ) VALUES (
        $1,
        $2
    )
    RETURNING id

`