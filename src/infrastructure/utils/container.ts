import { FastifyInstance } from 'fastify'
import { IoCContainer } from './ioc-container'
import { TransactionFactory } from '../../modules/transaction/factory/transaction.factory'
import { TransactionController } from '../api/controllers/transaction.controller'

declare module 'fastify' {
  interface FastifyInstance {
    container: IoCContainer<any>
  }
}

const configureContainerPlugin = (fastify: FastifyInstance): void => {
  const container = new IoCContainer<any>()

  const transactionFacade = TransactionFactory.create()
  const transactionController = new TransactionController(transactionFacade)
  container.register('TransactionController', transactionController)

  fastify.container = container
}

export default configureContainerPlugin
