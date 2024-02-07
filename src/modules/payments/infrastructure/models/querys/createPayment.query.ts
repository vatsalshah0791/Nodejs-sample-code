'use strict'


export default /*sql*/`

    INSERT INTO sm_pay (
        amount,
        commission,
        id_app_patient_payment_method,
        id_sm_collaborator,
        id_sm_patient_dental_treatment
    ) VALUES (
        $1,
        (
            SELECT commission
		    FROM sm_collaborator_sm_clinic
		    WHERE id_sm_collaborator = $3
		    AND deleted_at IS NULL
        ),
        $2,
        $3,
        $4
    )
    RETURNING id

`