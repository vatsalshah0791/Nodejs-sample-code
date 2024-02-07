'use strict'


export default /*sql*/`

    SELECT id

    FROM sm_collaborator_sm_clinic

    WHERE id_sm_collaborator = $1
    AND id_sm_clinic = $2
    AND deleted_at IS NULL

`