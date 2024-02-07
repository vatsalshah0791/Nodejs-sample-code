'use strict'


export default /*sql*/`

    UPDATE sm_patient_dental_treatment

    SET status = $1

    WHERE id = $2
    AND deleted_at IS NULL

`