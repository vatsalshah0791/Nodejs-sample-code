'use strict'


export default /*sql*/`

    SELECT
        id,
        product_name

    FROM sm_product

    WHERE id_sm_clinic = $1
    AND deleted_at IS NULL

`