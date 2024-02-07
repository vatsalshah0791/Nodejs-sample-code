'use strict'


import { Request, Response } from 'express'


export default (error: unknown, req: Request, res: Response) => {
  console.error(error)
  if(error instanceof Error) {
    req.apiResponse = {
      success: false,
      message: error.message || 'Internal Server Error',
      accessToken: { refresh: false },
      language: { refresh: false }
    }
    return res.status(500).json(req.apiResponse)
  }
  if(typeof error === 'object' && error !== null && 'message' in error) {
    req.apiResponse = {
      success: false,
      message: typeof error.message === 'string' ? error.message : 'Internal Server Error',
      accessToken: { refresh: false },
      language: { refresh: false }
    }
    return res.status(500).json(req.apiResponse)
  }
  req.apiResponse = {
    success: false,
    message: 'Unknown Error',
    accessToken: { refresh: false },
    language: { refresh: false }
  }
  return res.status(500).json(req.apiResponse)
}