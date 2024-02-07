'use strict'


export default /*sql*/`

    UPDATE sm_odontogram

    SET endodontics = (
        SELECT jsonb_set(
            endodontics,
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
        FROM jsonb_array_elements(endodontics->'data') AS item
    )

    WHERE id = $3
    AND deleted_at IS NULL

`