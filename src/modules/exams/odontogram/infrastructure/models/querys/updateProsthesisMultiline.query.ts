'use strict'


export default /*sql*/`

    UPDATE sm_odontogram

    SET prosthesis = (
        SELECT jsonb_set(
            prosthesis,
            '{data}',
            COALESCE(
                jsonb_agg(
                    CASE
                        WHEN item->>'title' = $1
                        THEN jsonb_set(
                            item,
                            '{values}',
                            (
                                SELECT jsonb_agg(
                                    CASE
                                        WHEN vals->>'title' = $2
                                        THEN jsonb_set(vals, '{value}', $3::jsonb)
                                        ELSE vals
                                    END
                                )
                                FROM jsonb_array_elements(item->'values') AS vals
                            )::jsonb
                        )
                        ELSE item
                    END
                ),
                '[]'::jsonb
            )
        )
        FROM jsonb_array_elements(prosthesis->'data') AS item
    )

    WHERE id = $4
    AND deleted_at IS NULL

`