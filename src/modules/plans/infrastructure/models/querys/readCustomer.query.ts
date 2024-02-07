'use strict'


export default /*sql*/`

  SELECT
    customer_id,
		email

  FROM sm_admin

  WHERE id_sm_account = $1
  AND deleted_at IS NULL

`