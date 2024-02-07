'use strict'


export default /*sql*/`

    UPDATE sm_periodontogram

    SET mobility = (
        SELECT jsonb_set(
            mobility,
            '{data}',
            COALESCE(
                jsonb_agg(
                    CASE
                        WHEN item->>'title' = $1
                        THEN jsonb_set(item, '{value}', $2::jsonb)
                        ELSE jsonb_set(item, '{value}', 'false'::jsonb)
                    END
                ),
                '[]'::jsonb
            )
        )
        FROM jsonb_array_elements(mobility->'data') AS item
    )

    WHERE id = $3
    AND deleted_at IS NULL

`