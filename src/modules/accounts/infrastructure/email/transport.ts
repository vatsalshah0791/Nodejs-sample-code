'use strict'


import nodemailer from 'nodemailer'

import { MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS } from '../../../../env/.env'


export default nodemailer.createTransport({
    host: MAILTRAP_HOST,
    port: Number(MAILTRAP_PORT),
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS
    }
})