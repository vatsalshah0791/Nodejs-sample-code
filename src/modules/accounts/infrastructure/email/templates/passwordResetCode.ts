'use strict'


import transport from '../transport'

import { MAILTRAP_FROM, DOMAIN } from '../../../../../env/.env'


interface DataInterface {
    to: string,
    idAccount: string,
    code: string
}


export default async (data: DataInterface) => {
    await transport.sendMail({
        from: MAILTRAP_FROM,
        to: data.to,
        subject: 'Reset password',
        text: `
            Reset password
            Hello!
            A password change has been requested for your account. If this was you, please use the link below to reset your password.
            Reset password
        `,
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Verification</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f8f9fa;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                    }

                    .container {
                        max-width: 80%;
                        width: 100%;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }

                    h2 {
                        color: #BB1C84;
                    }

                    p {
                        color: #333;
                        margin-bottom: 20px;
                    }

                    .verification-link {
                        display: inline-block;
                        padding: 10px 20px;
                        margin-top: 20px;
                        background-color: #BB1C84;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 3px;
                    }

                    @media screen and (max-width: 600px) {
                        .container {
                            max-width: 100%;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Reset password</h2>
                    <p>Hello!</p>
                    <p>A password change has been requested for your account. If this was you, please use the link below to reset your password.</p>
                    <a href="https://${DOMAIN}/reset-password/${data.idAccount}/${data.code}" class="verification-link">Reset password</a>
                </div>
            </body>
        </html>
        `,
    })
}