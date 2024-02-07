'use strict'


import { Request, Response, NextFunction } from 'express'

import errorHandler from './errorHandler.middleware'


export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const role: string = req.idRole as string
        if(!['3', '4', '5', '6', '7'].includes(role)) {
            req.apiResponse = {
                success: false,
                message: 'Forbidden, collaborators only',
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