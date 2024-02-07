'use strict'


import { QueryResult, Pool } from 'pg'

import TokenRepository from '../../domain/Token.repository'

import { CheckAccessTokenExistsInterface, CheckAccessTokenExistsResultInterface } from '../../domain/interfaces/CheckAccessTokenExists.interface'
import { CreateAccessTokenInterface, CreateAccessTokenResultInterface } from '../../domain/interfaces/CreateAccessToken.interface'

import checkAccessTokenExistsQuery from './querys/checkAccessTokenExists.query'
import createAccessTokenQuery from './querys/createAccessToken.query'


export default class TokenModel implements TokenRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean,
        private readonly createJwt: (param: { idAccount: string }) => string
    ) {}
    async checkAccessTokenExists(data: CheckAccessTokenExistsInterface): Promise<CheckAccessTokenExistsResultInterface> {
        try {
            const values = [
                data.accessToken,
                data.idAccount,
                data.allAccounts
            ]
            const selectSmAccessTokenResult: QueryResult = await this.db().query(checkAccessTokenExistsQuery, values)
            if(this.checkSelect(selectSmAccessTokenResult)) {
                const accessToken = selectSmAccessTokenResult.rows[0]
                const modelResult: CheckAccessTokenExistsResultInterface = {
                    success: true,
                    idRole: accessToken.as_id_app_role,
                    idAccount: accessToken.as_id_sm_account
                }
                return modelResult
            }
            const modelResult: CheckAccessTokenExistsResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: TokenModel.checkAccessTokenExists')
            throw error
        }
    }
    async createAccessToken(data: CreateAccessTokenInterface): Promise<CreateAccessTokenResultInterface> {
        try {
            const accessToken: string = this.createJwt({ idAccount: data.idAccount })
            const values = [
                accessToken,
                data.idAccount
            ]
            const insertSmAccessToken: QueryResult = await this.db().query(createAccessTokenQuery, values)
            if(this.checkInsert(insertSmAccessToken)) {
                const modelResult: CreateAccessTokenResultInterface = {
                    success: true,
                    accessToken
                }
                return modelResult
            }
            const modelResult: CreateAccessTokenResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: TokenModel.createAccessToken')
            throw error
        }
    }
}