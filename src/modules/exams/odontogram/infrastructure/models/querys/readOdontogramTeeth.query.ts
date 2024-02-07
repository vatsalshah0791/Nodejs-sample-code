'use strict'


export default /*sql*/`

    SELECT
        id,
        questions,
        general_odontology,
        prosthesis,
        endodontics,
        orthodontics

    FROM sm_odontogram

    WHERE id_sm_patient = $1
    AND teeth = $2
    AND deleted_at IS NULL

`