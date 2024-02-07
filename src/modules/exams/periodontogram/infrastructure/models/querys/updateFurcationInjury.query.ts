'use strict'


export default /*sql*/`

    UPDATE sm_periodontogram

    SET furcation_injury = (
        SELECT jsonb_set(
            furcation_injury,
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
        FROM jsonb_array_elements(furcation_injury->'data') AS item
    )

    WHERE id = $3
    AND deleted_at IS NULL

`