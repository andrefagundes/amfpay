import EventDispatcherInterface from '../../../@shared/event/dispatcher/event-dispatcher.interface'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import UserFacadeInterface from '../../../user/facade/facade.interface'
import Transaction from '../../domain/transaction.entity'
import TransactionCreatedEvent from '../../event/transaction-created.event'
import TransactionGateway from '../../gateway/transaction.gateway'
import { AuthorizationServiceInterface } from '../../service/authorization.interface'
import {
  ProcessTransactionInputDto,
  ProcessTransactionOutputDto,
} from './process-transaction.dto'

export default class TransactionUseCase implements UseCaseInterface {
  private _transactionRepository: TransactionGateway
  private _userFacade: UserFacadeInterface
  private _authorizationService: AuthorizationServiceInterface
  private _eventDispatcher: EventDispatcherInterface

  constructor(
    userFacade: UserFacadeInterface,
    transactionRepository: TransactionGateway,
    authorizationService: AuthorizationServiceInterface,
    eventDispatcher: EventDispatcherInterface,
  ) {
    this._userFacade = userFacade
    this._transactionRepository = transactionRepository
    this._authorizationService = authorizationService
    this._eventDispatcher = eventDispatcher
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

    if (!user || user.isMerchant) {
      throw 'Customer not allowed to transfer!'
    }

    if (user.wallet <= 0 || user.wallet < transaction.value) {
      throw 'Insufficient balance!'
    }

    if (!(await this._authorizationService.checkAuthorization())) {
      throw 'Unauthorized transfer service'
    }

    await this._transactionRepository.transferFunds(transaction)

    const persistTransaction = await this._transactionRepository.save(
      transaction,
    )

    const transactionCreatedEvent = new TransactionCreatedEvent(transaction)
    this._eventDispatcher.notify(transactionCreatedEvent)

    return {
      transactionId: persistTransaction.id.id,
      value: persistTransaction.value,
      senderId: persistTransaction.senderId,
      receiverId: persistTransaction.receiverId,
      createdAt: persistTransaction.createdAt,
    }
  }
}
