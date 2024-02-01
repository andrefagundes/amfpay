import { TransactionFactory } from '../../modules/transaction/factory/transaction.factory'
import { TransactionController } from '../api/controllers/transaction.controller'
import { IoCContainer } from './ioc-container'

const container = new IoCContainer<any>()

const transactionFactory = TransactionFactory.create()

const transactionController = new TransactionController(transactionFactory)
container.register('TransactionController', transactionController)

export { container }
