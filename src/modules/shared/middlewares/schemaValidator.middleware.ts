'use strict'


import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'


export default (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params
        })
        next()
    } catch (error) {
        if(error instanceof ZodError) {
            req.apiResponse = {
                success: false,
                message: 'Error validating data',
                accessToken: { refresh: false },
                language: { refresh: false },
                errors: error.issues.map(issue => ({
                    message: issue.message,
                    path: issue.path
                }))
            }
            return res.status(400).json(req.apiResponse)
        }
        console.error(error)
        req.apiResponse = {
            success: false,
            message: 'Internal Server Error',
            accessToken: { refresh: false },
            language: { refresh: false }
        }
        return res.status(500).json(req.apiResponse)
    }
}