'use strict'


export default /*sql*/`

    UPDATE sm_bacterial_plaque

    SET is_adult = $1

    WHERE id = $2
    AND deleted_at IS NULL

`