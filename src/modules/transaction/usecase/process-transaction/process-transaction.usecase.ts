import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import Transaction from '../../domain/transaction.entity'
import TransactionGateway from '../../gateway/transaction.gateway'
import {
  ProcessTransactionInputDto,
  ProcessTransactionOutputDto,
} from './process-transaction.dto'

export default class TransactionUseCase implements UseCaseInterface {
  private transactionRepository: TransactionGateway
  
  constructor(transactionRepository: TransactionGateway) { 
    this.transactionRepository = transactionRepository
  }

  async execute(
    input: ProcessTransactionInputDto,
  ): Promise<ProcessTransactionOutputDto> {
    const transaction = new Transaction({
      value: input.value,
      senderId: input.senderId,
      receiverId: input.receiverId,
    })

    const persistTransaction = await this.transactionRepository.save(
      transaction,
    )

    return {
      transactionId: persistTransaction.id.id,
      value: persistTransaction.value,
      senderId: persistTransaction.senderId,
      receiverId: persistTransaction.receiverId,
      createdAt: persistTransaction.createdAt,
    }
  }
}
