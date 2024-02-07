'use strict'


import transport from '../transport'

import { MAILTRAP_FROM, DOMAIN } from '../../../../../env/.env'


interface DataInterface {
    to: string,
    name: string,
    idAccount: string,
    verificationCode: string
}


export default async (data: DataInterface) => {
    await transport.sendMail({
        from: MAILTRAP_FROM,
        to: data.to,
        subject: 'Verify your account and start enjoying!',
        text: `
            Verification link
            Hello ${data.name}!
            Please click the following link to complete the verification process:
            Verify Account
            Thanks for being part of our community!
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
                    <h2>Verification link</h2>
                    <p>Hello ${data.name}!</p>
                    <p>Please click the following link to complete the verification process:</p>
                    <a href="https://${DOMAIN}/verification-code/${data.idAccount}/${data.verificationCode}" class="verification-link">Verify Account</a>
                    <p>Thanks for being part of our community!</p>
                </div>
            </body>
        </html>
        `,
    })
}