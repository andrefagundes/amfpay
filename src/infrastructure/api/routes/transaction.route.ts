import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { TransactionController } from '../controllers/transaction.controller'

const transactionRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  const transactionController =
    fastify.container.resolve<TransactionController>('TransactionController')

  fastify.post('/transaction', async (request, reply) => {
    try {
      const transactionPayload = request.body
      await transactionController.processTransaction(transactionPayload)
      reply.code(201).send({ success: true })
    } catch (error) {
      console.error(error)
      reply.code(500).send({ success: false, error: 'Internal Server Error' })
    }
  })
}

export default transactionRoutes
