'use strict'


/**
 * $3 = YYY-12-31
 * $4 = YYY-01-01
 */
export default /*sql*/`

    WITH incomes AS (
        SELECT
	        amount,
		    CASE
            	WHEN $2 = EXTRACT(YEAR FROM CURRENT_DATE) THEN
                	amount / EXTRACT(MONTH FROM CURRENT_DATE)
            	ELSE
                	amount / 12
    	    END AS as_month,
		    CASE
            	WHEN $2 = EXTRACT(YEAR FROM CURRENT_DATE) THEN
                	amount / EXTRACT(WEEK FROM CURRENT_DATE)
            	ELSE
                	amount / EXTRACT(WEEK FROM $3::TIMESTAMP)
    	    END AS as_week,
		    CASE
            	WHEN $2 = EXTRACT(YEAR FROM CURRENT_DATE) THEN
                	amount / (SELECT EXTRACT(DAY FROM (CURRENT_DATE - $4::TIMESTAMP)))::INTEGER
            	ELSE
                	amount / (SELECT EXTRACT(DAY FROM (($4::TIMESTAMP + INTERVAL '1 year') - $4::TIMESTAMP)))
    	    END AS as_day

        FROM sm_pay

        INNER JOIN sm_patient_dental_treatment
        ON sm_patient_dental_treatment.id = sm_pay.id_sm_patient_dental_treatment

        INNER JOIN sm_patient
        ON sm_patient.id = sm_patient_dental_treatment.id_sm_patient

        WHERE sm_patient.id_sm_clinic = $1
        AND EXTRACT(YEAR FROM sm_pay.created_at) = $2
        AND sm_pay.deleted_at IS NULL
    )
	SELECT
		SUM(amount) AS as_year,
		SUM(as_month * (
			CASE
        		WHEN $2 = EXTRACT(YEAR FROM CURRENT_DATE) THEN
            	12 / EXTRACT(MONTH FROM CURRENT_DATE)
        	ELSE 1
    		END)
		) AS as_projection,
		SUM(as_month) AS as_month,
		SUM(as_week) AS as_week,
		SUM(as_day) AS as_day
	FROM incomes

`