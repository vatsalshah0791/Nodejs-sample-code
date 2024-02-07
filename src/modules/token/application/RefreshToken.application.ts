'use strict'


import TokenRepository from '../domain/Token.repository'

import { CreateAccessTokenInterface } from '../domain/interfaces/CreateAccessToken.interface'


interface DTO {
    success: boolean
    data?: {
        accessToken?: string
    }
}


export default class RefreshTokenApplication {
    constructor(private readonly tokenRespository: TokenRepository) {}
    async run(data: CreateAccessTokenInterface): Promise<DTO> {
        const createAccessTokenResult = await this.tokenRespository.createAccessToken(data)
        if(!createAccessTokenResult.success) {
            const response: DTO = { success: false }
            return response
        }
        const response: DTO = {
            success: true,
            data: {
                accessToken: createAccessTokenResult.accessToken
            }
        }
        return response
    }
}