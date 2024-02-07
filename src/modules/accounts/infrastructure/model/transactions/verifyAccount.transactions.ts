'use strict'


export default [
/*sql*/`

    UPDATE sm_account

    SET is_verified = true

    WHERE id = $1
    AND deleted_at IS NULL

`,
/*sql*/`

    UPDATE sm_verification_code

    SET deleted_at = NOW()

    WHERE id_sm_account = $1
    AND deleted_at IS NULL

`]