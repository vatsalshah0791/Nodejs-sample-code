'use strict'


import { Request, Response, NextFunction } from 'express'

import errorHandler from './errorHandler.middleware'


export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const role: string = req.idRole as string
        if(role === '2') {
            req.apiResponse = {
                success: false,
                message: 'Forbidden, no patients',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            return res.status(403).json(req.apiResponse)
        }
        return next()
    } catch (error) {
        return errorHandler(error, req, res)
    }
}