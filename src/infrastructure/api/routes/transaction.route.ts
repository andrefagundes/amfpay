import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { TransactionController } from '../controllers/transaction.controller'
import { transactionSchema } from '../../../modules/transaction/validation/transaction.schema'

const transactionRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  const transactionController = app.container.resolve<TransactionController>(
    'TransactionController',
  )

  app.post(
    '/transaction',
    { schema: transactionSchema },
    async (request, reply) => {
      await transactionController.processTransaction(request, reply)
    },
  )
}

export default transactionRoutes
