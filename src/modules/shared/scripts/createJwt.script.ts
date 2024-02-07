'use strict'


import { sign } from 'jsonwebtoken'

import {
    TOKEN_SECRET,
    TOKEN_ISSUER,
    TOKEN_AUDIENCE,
    TOKEN_SUBJECT,
    TOKEN_EXPIRESIN
} from '../../../env/.env'


export default (data: { idAccount: string }) => sign(
    data,
    TOKEN_SECRET as string,
    {
        issuer: TOKEN_ISSUER,
        audience: TOKEN_AUDIENCE,
        subject: TOKEN_SUBJECT,
        expiresIn: TOKEN_EXPIRESIN
    }
)