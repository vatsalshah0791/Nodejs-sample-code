'use strict'


export default /*sql*/`

    SELECT
        id,
        exam_notes

    FROM sm_endodontics

    WHERE id_sm_patient = $1
    AND deleted_at IS NULL

`