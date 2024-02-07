'use strict'


import AppGender from '../entities/AppGender'


export interface ReadGendersResultInterface {
    id: AppGender['id']
    genderName: AppGender['genderName']
}