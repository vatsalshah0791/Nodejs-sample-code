'use strict'


export default /*sql*/`

    SELECT
        id,
        teeth,
        questions,
        mobility,
        furcation_injury,
        gingival_margin,
        periodontal_pocket

    FROM sm_periodontogram

    WHERE id_sm_patient = $1
    AND deleted_at IS NULL

`