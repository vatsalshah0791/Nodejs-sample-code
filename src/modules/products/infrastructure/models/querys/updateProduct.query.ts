'use strict'


export default /*sql*/`

    UPDATE sm_product

    SET product_name = $1

    WHERE id = $2
    AND deleted_at IS NULL

`