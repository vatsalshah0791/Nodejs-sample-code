'use strict'


export default /*sql*/`

    SELECT
        id,
        role_name

    FROM app_role

    WHERE deleted_at IS NULL
    AND role_name != 'admin'

`