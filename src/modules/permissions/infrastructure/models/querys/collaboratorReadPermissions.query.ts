'use strict'


export default /*sql*/`

	SELECT
		app_section.id as id_app_section,
		app_section.section_name,
		CASE
    		WHEN sm_permission.can_read IS NOT NULL AND sm_permission.can_read = TRUE THEN TRUE
    		ELSE FALSE
    	END AS as_can_read,
		CASE
    		WHEN sm_permission.can_write IS NOT NULL AND sm_permission.can_write = TRUE THEN TRUE
    		ELSE FALSE
    	END AS as_can_write

	FROM app_section

	LEFT JOIN sm_permission
	ON sm_permission.id_app_section = app_section.id
	AND sm_permission.id_sm_collaborator = (
		SELECT id

        FROM sm_collaborator

        WHERE id_sm_account = $1
        AND deleted_at IS NULL
	)

	WHERE sm_permission.deleted_at IS NULL
	AND app_section.deleted_at IS NULL

`