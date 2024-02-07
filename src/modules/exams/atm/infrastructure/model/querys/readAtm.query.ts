'use strict'


export default /*sql*/`

    SELECT
        id,
        exam_notes,
        questions,
        snap,
        crepitation,
        pain,
        opening,
        closing,
        treatment

    FROM sm_atm

    WHERE id_sm_patient = $1
    AND deleted_at IS NULL

`