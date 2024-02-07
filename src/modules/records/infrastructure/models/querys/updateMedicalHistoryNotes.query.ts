'use strict'


export default /*sql*/`

    UPDATE sm_record

    SET medical_history_notes = $1

    WHERE id = $2
    AND deleted_at IS NULL

`