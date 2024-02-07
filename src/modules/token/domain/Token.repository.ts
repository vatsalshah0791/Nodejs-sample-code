'use strict'


import {
    CheckAccessTokenExistsInterface,
    CheckAccessTokenExistsResultInterface
} from './interfaces/CheckAccessTokenExists.interface'
import {
    CreateAccessTokenInterface,
    CreateAccessTokenResultInterface
} from './interfaces/CreateAccessToken.interface'


export default interface TokenRepository {

    checkAccessTokenExists(data: CheckAccessTokenExistsInterface): Promise<CheckAccessTokenExistsResultInterface>

    createAccessToken(data: CreateAccessTokenInterface): Promise<CreateAccessTokenResultInterface>

}