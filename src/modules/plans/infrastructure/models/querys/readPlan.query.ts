'use strict'


export default /*sql*/`

    SELECT
        plan_code,
        clinics,
        dental_chairs,
        doctors,
        collaborators,
        patients

    FROM app_plan

    WHERE id = $1
    AND deleted_at IS NULL

`