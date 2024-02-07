'use strict'


export default /*sql*/`

    SELECT
        id,
        pain,
        clinical_examination,
        x_rays,
        sensitivity_test,
        diagnosis,
        ducts

    FROM sm_endodontics_teeth

    WHERE id_sm_patient = $1
    AND teeth = $2
    AND deleted_at IS NULL

`