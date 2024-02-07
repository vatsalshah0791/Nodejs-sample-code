'use strict'


export default /*sql*/`

    UPDATE sm_endodontics_teeth

    SET x_rays = (
        SELECT jsonb_set(
            x_rays,
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
                                        ELSE jsonb_set(vals, '{value}', 'false'::jsonb)
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
        FROM jsonb_array_elements(x_rays->'data') AS item
    )

    WHERE id = $4
    AND deleted_at IS NULL

`