'use strict'


export default /*sql*/`

    UPDATE sm_endodontics_teeth

    SET diagnosis = (
        SELECT jsonb_set(
            diagnosis,
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
        FROM jsonb_array_elements(diagnosis->'data') AS item
    )

    WHERE id = $3
    AND deleted_at IS NULL

`