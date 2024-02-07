'use strict'


export default /*sql*/`

    UPDATE sm_patient_dental_treatment

    SET deleted_at = NOW()

    WHERE id = $1
    AND deleted_at IS NULL

`