'use strict'


interface AccessTokenInterface {
    refresh: boolean
    accessToken?: string
}
interface LanguageInterface {
    refresh: boolean
    language?: string
}
interface ErrorsResponseInterface {
    path: (string | number)[]
    message: string
}


interface ApiResponseInterface {
    success: boolean
    message: string
    accessToken: AccessTokenInterface
    language: LanguageInterface
    data?: Record<string, any>
    errors?: ErrorsResponseInterface[]
}


declare namespace Express {
    export interface Request {
        idRole: string
        idAccount: string
        accessTokenNeedRefresh: boolean
        apiResponse: ApiResponseInterface
    }
}


declare namespace Express.Multer {
    export interface File {
        key: string
    }
}


declare module 'cybersource-rest-client'