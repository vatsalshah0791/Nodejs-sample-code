'use strict'


export default /*sql*/`

    UPDATE sm_periodontogram

    SET gingival_margin = jsonb_set(
        gingival_margin,
        '{data}',
        $1::jsonb
    )

    WHERE id = $2
    AND deleted_at IS NULL

`