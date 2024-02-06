import { FastifyReply, FastifyRequest } from 'fastify'
import TransactionFacadeInterface from '../../../modules/transaction/facade/facade.interface'
import TransactionError from '../../../modules/transaction/errors/transaction-error'

export interface TransactionPayload {
  value: number
  senderId: string
  receiverId: string
}

class TransactionController {
  constructor(private transactionFacade: TransactionFacadeInterface) {}

  async processTransaction(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const { senderId, receiverId, value } = request.body as TransactionPayload
      await this.transactionFacade.process({
        senderId,
        receiverId,
        value,
      })
      reply.code(201).send({ success: true })
    } catch (error) {
      if (error instanceof TransactionError) {
        reply.status(400).send(error.toResponse())
      } else {
        reply
          .status(500)
          .send({ success: false, error: 'Internal Server Error' })
      }
    }
  }
}

export { TransactionController }
