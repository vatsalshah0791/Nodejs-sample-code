'use strict'


import AppRole from '../entities/AppRole'


export interface ReadRolesResultInterface {
    id: AppRole['id']
    roleName: AppRole['roleName']
}