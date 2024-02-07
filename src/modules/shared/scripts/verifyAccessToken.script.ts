'use strict'


import { verify } from 'jsonwebtoken'

import { TOKEN_SECRET } from '../../../env/.env'


export const verifyAccessToken = (token: string) => verify(token, TOKEN_SECRET as string) as { idAccount: string }