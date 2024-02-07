'use strict'


import TokenRespository from '../domain/Token.repository'

import { CheckAccessTokenExistsInterface } from '../domain/interfaces/CheckAccessTokenExists.interface'


interface DTO {
    success: boolean
    statusCode: number
    message: string
    accessTokenNeedRefresh: boolean
    data?: {
        idRole?: string
        idAccount?: string
    }
}


export default class IsAuthApplication {
    constructor(private readonly tokenRespository: TokenRespository) {}
    async run(data: CheckAccessTokenExistsInterface & { accessTokenExp: number }): Promise<DTO> {
        const checkAccessTokenExistsResult = await this.tokenRespository.checkAccessTokenExists(data)
        if(!checkAccessTokenExistsResult.success) {
            const response: DTO = {
                success: false,
                statusCode: 401,
                message: 'Without authorization',
                accessTokenNeedRefresh: false
            }
            return response
        }
        const now = new Date().getTime()
        const expirationTokenDate = data.accessTokenExp * 1000
        const timeDifference = expirationTokenDate - now
        const hoursRemaining = timeDifference / (1000 * 60 * 60)
        if(hoursRemaining <= 48) {
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                accessTokenNeedRefresh: true,
                data: {
                    idRole: checkAccessTokenExistsResult.idRole,
                    idAccount: checkAccessTokenExistsResult.idAccount
                }
            }
            return response
        }
        const response: DTO = {
            success: true,
            statusCode: 200,
            message: 'Success',
            accessTokenNeedRefresh: false,
            data: {
                idRole: checkAccessTokenExistsResult.idRole,
                idAccount: checkAccessTokenExistsResult.idAccount
            }
        }
        return response
    }
}