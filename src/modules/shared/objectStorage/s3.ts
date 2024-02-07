'use strict'


import { S3Client, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { streamCollector } from '@aws-sdk/node-http-handler'

import { S3_ENDPOINT, BUCKET_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } from '../../../env/.env'


export const s3 = new S3Client({
    endpoint: S3_ENDPOINT,
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID as string,
        secretAccessKey: AWS_SECRET_ACCESS_KEY as string
    }
})


export const getObjectBase64 = async (Key: string | null | undefined) => {
    try {
        if(Key === null || Key === undefined) return null
        const { Body } = await s3.send(new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key
        }))
        const body = await streamCollector(Body)
        const base64Data = Buffer.from(body).toString('base64')
        return base64Data
    } catch (error) {
        console.error(error)
        throw error
    }
}


export const deleteObject = async (Key: string | null | undefined) => {
    try {
        if(Key === null || Key === undefined) return true
        await s3.send(new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key
        }))
        return true
    } catch (error) {
        console.error(error)
        throw error
    }
}