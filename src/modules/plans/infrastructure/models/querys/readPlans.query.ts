'use strict'


export default /*sql*/`

    SELECT
        id,
        plan_code,
        clinics,
        dental_chairs,
        doctors,
        collaborators,
        patients

    FROM app_plan

    WHERE deleted_at IS NULL

`