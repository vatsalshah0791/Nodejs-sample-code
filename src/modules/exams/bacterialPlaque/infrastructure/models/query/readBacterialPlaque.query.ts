'use strict'


export default /*sql*/`

    SELECT
        id,
        is_adult,
        right_upper_quadrant,
        upper_left_quadrant,
        right_lower_quadrant,
        lower_left_quadrant

    FROM sm_bacterial_plaque

    WHERE id_sm_patient = $1
    AND deleted_at IS NULL

`