'use strict'


import SmOrthodontics from '../entities/SmOrthodontics'


export interface UpdateMiddleLineInterface {
    id: SmOrthodontics['id']
    coincident: number
    mandibular: number
    maxillary: number
}