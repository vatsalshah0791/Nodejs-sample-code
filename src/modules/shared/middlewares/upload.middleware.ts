'use strict'


import path from 'path'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { v4 as uuidv4 } from 'uuid'

import { BUCKET_NAME, FOLDER } from '../../../env/.env'

import errorHandler from './errorHandler.middleware'
import { s3 } from '../objectStorage/s3'
import { mimetypes, fileSizeInMegabytes } from '../config/upload.config'


export default (data: { fileFields?: number, nonFileFields?: number } = { fileFields: 1, nonFileFields: 1 }) => (req: Request, res: Response, next: NextFunction) => {
    try {
        multer({
            storage: multerS3({
                s3,
                bucket: BUCKET_NAME as string,
                metadata: (_, file, callback) => callback(null, {
                    originalname: file.originalname,
                    encoding: file.encoding,
                    mimetype: file.mimetype
                }),
                key: (_, file, callback) => {
                    const extname = path.extname(file.originalname).toLowerCase()
                    callback(null, `${FOLDER}${uuidv4()}${extname}`)
                }
            }),
            fileFilter: (_, file, callback) => {
                if(mimetypes.includes(file.mimetype)) {
                    callback(null, true)
                }
                else {
                    callback(new Error('The type of file you are trying to upload is not what you expected!'))
                }
            },
            limits: {
                fields: data.nonFileFields,
                files: data.fileFields,
                fileSize: fileSizeInMegabytes * 1024 * 1024, //megas * kilobytes * bytes
            }
        }).single('image')(req, res, error => {
            if (error instanceof multer.MulterError) {
                req.apiResponse = {
                    success: false,
                    message: error.message,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                return res.status(400).json(req.apiResponse)
            } else if (error) {
                return errorHandler(error, req, res)
            }
            return next()
          })
    } catch (error) {
        return errorHandler(error, req, res)
    }
}