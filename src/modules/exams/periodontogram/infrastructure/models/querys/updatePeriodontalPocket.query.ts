'use strict'


export default /*sql*/`

    UPDATE sm_periodontogram

    SET periodontal_pocket = jsonb_set(
        periodontal_pocket,
        '{data}',
        $1::jsonb
    )

    WHERE id = $2
    AND deleted_at IS NULL

`