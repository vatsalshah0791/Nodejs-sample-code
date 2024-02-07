'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    getObjectBase64,
    deleteObject,
    errorHandler
} from './shared.import'

import PhotoModel from './models/Photo.model'

import CreatePhotoApplication from '../application/CreatePhoto.application'
import ReadPhotosApplication from '../application/ReadPhotos.application'
import DeletePhotoApplication from '../application/DeletePhoto.application'

import CreatePhotoController from './controllers/CreatePhoto.controller'
import ReadPhotosController from './controllers/ReadPhotos.controller'
import DeletePhotoController from './controllers/DeletePhoto.controller'


const photoModel = new PhotoModel(db, checkSelect, checkInsert)


const createPhotoApplication = new CreatePhotoApplication(photoModel)
const readPhotosApplication = new ReadPhotosApplication(photoModel, getObjectBase64)
const deletePhotoApplication = new DeletePhotoApplication(photoModel, deleteObject)

export const createPhotoController = new CreatePhotoController(createPhotoApplication, errorHandler)
export const readPhotosController = new ReadPhotosController(readPhotosApplication, errorHandler)
export const deletePhotoController = new DeletePhotoController(deletePhotoApplication, errorHandler)