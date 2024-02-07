'use strict'


export default /*sql*/`

    SELECT
    	sm_appointment.id,
    	TO_CHAR(sm_appointment.appointment_date, 'YYYY-MM-DD') as as_appointment_date,
        TO_CHAR(sm_appointment.start_time, 'HH24:MI') as as_start_time,
		TO_CHAR(sm_appointment.ending_time, 'HH24:MI') as as_ending_time,
    	sm_appointment.annotations,
    	sm_appointment.status,
    	sm_dental_chair.chair_name,
    	sm_account.first_name || ' ' || sm_account.last_name as as_doctor,
    	sm_dental_treatment.treatment_name,
    	sm_dental_treatment.price,
    	sm_patient.email,
        sm_patient.phone_prefix,
    	sm_patient.phone,
        patient.photo,
    	patient.first_name || ' ' || patient.last_name as as_patient,
    	sm_appointment.id_sm_dental_chair,
    	sm_appointment.id_sm_collaborator,
    	sm_appointment.id_sm_dental_treatment,
        sm_appointment.id_sm_patient

    FROM sm_appointment

    INNER JOIN sm_dental_chair
    ON sm_dental_chair.id = sm_appointment.id_sm_dental_chair

    INNER JOIN sm_collaborator
    ON sm_collaborator.id = sm_appointment.id_sm_collaborator

    INNER JOIN sm_account
    ON sm_account.id = sm_collaborator.id_sm_account

    INNER JOIN sm_dental_treatment
    ON sm_dental_treatment.id = sm_appointment.id_sm_dental_treatment

    INNER JOIN sm_patient
    ON sm_patient.id = sm_appointment.id_sm_patient

    INNER JOIN sm_account patient
    ON patient.id = sm_patient.id_sm_account

    WHERE sm_appointment.id_sm_clinic = $1
    AND sm_appointment.deleted_at IS NULL
    AND sm_appointment.status = 1

    ORDER BY sm_appointment.appointment_date DESC

    LIMIT 1

`