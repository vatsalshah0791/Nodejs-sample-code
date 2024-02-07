'use strict'


export default [
/*sql*/`

    UPDATE sm_odontogram

    SET questions = (
        SELECT jsonb_set(
            questions,
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
        FROM jsonb_array_elements(questions->'data') AS item
    )

    WHERE id = $3
    AND deleted_at IS NULL

`,
/*sql*/`

    UPDATE sm_odontogram

    SET
        questions = (
            SELECT jsonb_set(
                questions,
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
            FROM jsonb_array_elements(questions->'data') AS item
        ),
        general_odontology = DEFAULT,
        prosthesis = DEFAULT,
        endodontics = DEFAULT,
        orthodontics = DEFAULT

    WHERE id = $3
    AND deleted_at IS NULL

`
]