'use strict'


export default /*sql*/`

    SELECT id_app_section

    FROM sm_permission

    WHERE id_sm_collaborator = (
    	SELECT id

        FROM sm_collaborator

        WHERE id_sm_account = $1
        AND deleted_at IS NULL
    )
    AND can_read = true
    AND id_app_section = $2
    AND deleted_at IS NULL

`