'use strict'


export default /*sql*/`

    UPDATE sm_endodontics

    SET exam_notes = $1

    WHERE id = $2
    AND deleted_at IS NULL

`