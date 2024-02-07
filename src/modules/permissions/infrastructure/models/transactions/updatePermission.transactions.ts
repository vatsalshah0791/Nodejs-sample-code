'use strict'


export default [
/*sql*/`

    SELECT id

    FROM sm_permission

    WHERE id_sm_collaborator = $1
    AND id_app_section = $2
    AND deleted_at IS NULL

`,
/*sql*/`

    UPDATE sm_permission

    SET
        can_read = $1,
        can_write = $2

    WHERE id_sm_collaborator = $3
    AND id_app_section = $4
    AND deleted_at IS NULL

`,
/*sql*/`

    INSERT INTO sm_permission (
        can_read,
        can_write,
        id_sm_collaborator,
        id_app_section
    ) VALUES (
        $1,
        $2,
        $3,
        $4
    )

`]