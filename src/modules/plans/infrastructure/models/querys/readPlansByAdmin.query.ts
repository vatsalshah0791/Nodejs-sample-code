'use strict'


export default /*sql*/`

    SELECT
        app_plan.id,
    	app_plan.plan_code,
    	app_plan.clinics,
    	app_plan.dental_chairs,
    	app_plan.doctors,
    	app_plan.collaborators,
    	app_plan.patients,
        CASE
            WHEN sm_admin.id_app_plan IS NOT NULL THEN TRUE
            ELSE FALSE
        END AS is_active

    FROM app_plan

    LEFT JOIN sm_admin
    ON sm_admin.id_app_plan = app_plan.id
	AND sm_admin.id_sm_account = $1
	AND sm_admin.deleted_at IS NULL

`