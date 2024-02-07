'use strict'


export default /*sql*/`

    UPDATE sm_orthodontics

    SET dental_exam = jsonb_set(dental_exam, '{form,middleLine}', $1::jsonb)

    WHERE id = $2
    AND deleted_at IS NULL

`