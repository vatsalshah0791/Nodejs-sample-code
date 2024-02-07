'use strict'

import {
    CreateBillInterface,
    CreateBillResultInterface,
    ReadByDateInterface,
    ReadByDateResultInterface,
    ReadBillInterface,
    ReadBillResultInterface
} from './Bill.interface'

export default interface BillRepository {

    createBill(data: CreateBillInterface): Promise<CreateBillResultInterface>

    readByDate(data: ReadByDateInterface): Promise<ReadByDateResultInterface[]>

    readBill(data: ReadBillInterface): Promise<ReadBillResultInterface>

}