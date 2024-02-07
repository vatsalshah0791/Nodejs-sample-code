'use strict'


import AccountRespository from '../domain/Account.repository'

import { UpdatePasswordInterface } from '../domain/interfaces/UpdatePassword.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdatePasswordApplication {
    constructor(private readonly accountRespository: AccountRespository) {}
    async run(data: UpdatePasswordInterface & { currentPassword: string }): Promise<Result> {
        const readPasswordsAccountResult = await this.accountRespository.readPasswords({ idAccount: data.idAccount })
        if(!readPasswordsAccountResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Error interpreting passwords'
            }
            return response
        }
        const verifyCurrentPassword: boolean = await this.accountRespository.comparePasswords({
            hash: readPasswordsAccountResult.realPassword as string,
            text: data.currentPassword
        })
        if(!verifyCurrentPassword) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The current password is incorrect'
            }
            return response
        }
        const verifyNewPassword: boolean = await this.accountRespository.comparePasswords({
            hash: readPasswordsAccountResult.realPassword as string,
            text: data.newPassword
        })
        if(verifyNewPassword) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The new password is similar to the current password'
            }
            return response
        }
        const verifyOldPassword: boolean = await this.accountRespository.comparePasswords({
            hash: readPasswordsAccountResult.oldPassword as string,
            text: data.newPassword
        })
        if(verifyOldPassword) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The new password was used previously'
            }
            return response
        }
        const updatePasswordResult = await this.accountRespository.updatePassword({
            idAccount: data.idAccount,
            newPassword: data.newPassword
        })
        if(!updatePasswordResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error changing password'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Password change successful'
        }
        return response
    }
}