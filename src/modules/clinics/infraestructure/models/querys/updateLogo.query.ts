'use strict'


export default /*sql*/`

    UPDATE sm_clinic

    SET logo = $1

    WHERE id = $2
    AND deleted_at IS NULL

`