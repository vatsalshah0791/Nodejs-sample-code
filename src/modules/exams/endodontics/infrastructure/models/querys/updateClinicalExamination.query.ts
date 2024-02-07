'use strict'


export default /*sql*/`

    UPDATE sm_endodontics_teeth

    SET clinical_examination = (
        SELECT jsonb_set(
            clinical_examination,
            '{data}',
            COALESCE(
                jsonb_agg(
                    CASE
                        WHEN item->>'title' = $1
                        THEN jsonb_set(item, '{value}', $2::jsonb)
                        ELSE item
                    END
                ),
                '[]'::jsonb
            )
        )
        FROM jsonb_array_elements(clinical_examination->'data') AS item
    )

    WHERE id = $3
    AND deleted_at IS NULL

`