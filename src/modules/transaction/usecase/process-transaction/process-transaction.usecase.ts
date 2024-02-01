import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import UserFacadeInterface from '../../../user/facade/facade.interface'
import Transaction from '../../domain/transaction.entity'
import TransactionGateway from '../../gateway/transaction.gateway'
import { AuthorizationServiceInterface } from '../../service/authorization.interface'
import {
  ProcessTransactionInputDto,
  ProcessTransactionOutputDto,
} from './process-transaction.dto'

type checkTransactionInput = {
  value: number
  senderId: string
  document: string
  wallet: number
}

export default class TransactionUseCase implements UseCaseInterface {
  private _transactionRepository: TransactionGateway
  private _userFacade: UserFacadeInterface
  private _authorizationService: AuthorizationServiceInterface

  constructor(
    userFacade: UserFacadeInterface,
    transactionRepository: TransactionGateway,
    authorizationService: AuthorizationServiceInterface,
  ) {
    this._userFacade = userFacade
    this._transactionRepository = transactionRepository
    this._authorizationService = authorizationService
  }

  async execute(
    input: ProcessTransactionInputDto,
  ): Promise<ProcessTransactionOutputDto> {
    const transaction = new Transaction({
      value: input.value,
      senderId: input.senderId,
      receiverId: input.receiverId,
    })

    const user = await this._userFacade.find({ userId: transaction.senderId })

    const checkTransactionInput: checkTransactionInput = {
      value: transaction.value,
      senderId: transaction.senderId,
      document: user.document,
      wallet: user.wallet,
    }

    if (!this.checkUserPf(checkTransactionInput)) {
      throw new Error('Customer not allowed to transfer!')
    }

    if (!this.checkBalance(checkTransactionInput)) {
      throw new Error('Insufficient balance!')
    }

    if (!(await this._authorizationService.checkAuthorization())) {
      throw new Error('Unauthorized transfer service')
    }

    await this._transactionRepository.transferFunds(transaction)

    const persistTransaction = await this._transactionRepository.save(
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

  private checkUserPf(user: Pick<checkTransactionInput, 'document'>): boolean {
    return !user.document || user.document.length > 11
  }

  private checkBalance(
    user: Pick<checkTransactionInput, 'wallet' | 'value'>,
  ): boolean {
    return user.wallet >= user.value
  }
}
