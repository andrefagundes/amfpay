import { PrismaClient } from '@prisma/client'
import Transaction from '../domain/transaction.entity'
import TransactionGateway from '../gateway/transaction.gateway'
import Id from '../../@shared/domain/value-object/id.value-object'

const prisma = new PrismaClient()

export default class TransactionRepository implements TransactionGateway {
  async save(input: Transaction): Promise<Transaction> {
    const createdTransaction = await prisma.transaction.create({
      data: {
        id: input.id.toString(),
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
}
