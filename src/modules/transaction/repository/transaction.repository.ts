import { PrismaClient } from '@prisma/client'
import Transaction from '../domain/transaction.entity'
import TransactionGateway from '../gateway/transaction.gateway'
import Id from '../../@shared/domain/value-object/id.value-object'

const prisma = new PrismaClient()

export default class TransactionRepository implements TransactionGateway {
  async save(input: Transaction): Promise<Transaction> {
    const createdTransaction = await prisma.transaction.create({
      data: {
        id: input.id.id,
        value: input.value,
        createdAt: input.createdAt,
        sender: {
          connect: {
            id: input.senderId,
          },
        },
        receiver: {
          connect: {
            id: input.receiverId,
          },
        },
      },
    })

    return new Transaction({
      id: new Id(createdTransaction.id),
      value: createdTransaction.value,
      senderId: createdTransaction.senderId,
      receiverId: createdTransaction.receiverId,
      createdAt: createdTransaction.createdAt,
    })
  }

  async transferFunds(input: Transaction): Promise<Transaction> {
    try {
      await prisma.$transaction(async (transaction) => {
        await prisma.user.update({
          where: { id: input.senderId },
          data: { wallet: { decrement: input.value } },
        })

        await prisma.user.update({
          where: { id: input.receiverId },
          data: { wallet: { increment: input.value } },
        })
      })

      return new Transaction({
        value: input.value,
        senderId: input.senderId,
        receiverId: input.receiverId,
        createdAt: input.createdAt,
      })
    } catch (err) {
      const errorMessage = (err as Error).message || 'Unknown error'
      console.error(`Error during funds transfer:${errorMessage}`)
      throw new Error('Funds transfer failed')
    }
  }
}
