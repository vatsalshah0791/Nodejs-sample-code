'use strict'


export default /*sql*/`

    UPDATE sm_orthodontics

    SET exam_notes = $1

    WHERE id = $2
    AND deleted_at IS NULL

`