'use strict'


export default /*sql*/`

    INSERT INTO sm_photo (
        photo,
        id_sm_patient
    ) VALUES (
        $1,
        $2
    )
    RETURNING id

`