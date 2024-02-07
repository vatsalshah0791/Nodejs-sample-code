'use strict'


export default /*sql*/`

    SELECT id, language_name

    FROM app_language

    WHERE deleted_at IS NULL

`