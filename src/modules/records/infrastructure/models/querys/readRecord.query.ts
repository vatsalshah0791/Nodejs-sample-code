'use strict'


export default /*sql*/`

    SELECT
        id,
        medical_history_notes,
        dental_history_notes,
        allergies,
        heart_problems,
        medical_record,
        sensitivity,
        oral_exam,
        ailments

    FROM sm_record

    WHERE id_sm_patient = $1
    AND deleted_at IS NULL

`