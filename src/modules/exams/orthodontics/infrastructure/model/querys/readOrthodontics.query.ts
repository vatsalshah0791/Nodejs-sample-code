'use strict'


export default /*sql*/`

    SELECT
        id,
        exam_notes,
        soft_tissue,
        dental_exam

    FROM sm_orthodontics

    WHERE id_sm_patient = $1
    AND deleted_at IS NULL

`