'use strict'


export default /*sql*/`

    SELECT
        id,
        questions,
        mobility,
        furcation_injury,
        gingival_margin,
        periodontal_pocket

    FROM sm_periodontogram

    WHERE id_sm_patient = $1
    AND teeth = $2
    AND deleted_at IS NULL

`