'use strict'


export default /*sql*/`

    WITH months AS (SELECT generate_series(1, 12) AS mth)

    SELECT
        months.mth,
        COALESCE(COUNT(sm_patient.id), 0) AS patients

    FROM months

    LEFT JOIN sm_patient
    	ON EXTRACT(MONTH FROM sm_patient.created_at) = months.mth
        AND EXTRACT(YEAR FROM sm_patient.created_at) = EXTRACT(YEAR FROM NOW())
        AND sm_patient.id_sm_clinic = $1
        AND sm_patient.deleted_at IS NULL

    GROUP BY
        months.mth

    ORDER BY
        months.mth

`