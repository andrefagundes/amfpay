import { FastifyInstance } from 'fastify'
import { TransactionController } from '../controllers/transaction.controller'
import { container } from '../../utils/container'

export default function transactionRoutes(
  fastify: FastifyInstance,
  next: () => void,
): void {
  const transactionController = container.resolve<TransactionController>(
    'TransactionController',
  )

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

  next()
}
