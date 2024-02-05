import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { TransactionController } from '../controllers/transaction.controller'
import { transactionSchema } from '../../../modules/transaction/validation/transaction.schema'

interface TransactionPayload {
  senderId: string
  receiverId: string
  value: number
}

const transactionRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  const transactionController = app.container.resolve<TransactionController>(
    'TransactionController',
  )

  app.post(
    '/transaction',
    { schema: transactionSchema },
    async (request, reply) => {
      try {
        const { senderId, receiverId, value } =
          request.body as TransactionPayload
        const transactionPayload = { senderId, receiverId, value }
        await transactionController.processTransaction(transactionPayload)

        reply.code(201).send({ success: true })
      } catch (error: any) {
        reply.code(500).send({ success: false, error })
      }
    },
  )
}

export default transactionRoutes
