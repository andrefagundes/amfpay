import UserFacade from '../../user/facade/user.facade'
import TransactionFacadeInterface from '../facade/facade.interface'
import TransactionFacade from '../facade/transaction.facade'
import TransactionRepository from '../repository/transaction.repository'
import TransactionUseCase from '../usecase/process-transaction/process-transaction.usecase'
import UserUseCase from '../../user/usecase/find/find-user.usecase'
import UserRepository from '../../user/repository/user.repository'
import { AuthorizationService } from '../service/authorization.service'
import EventDispatcher from '../../@shared/event/dispatcher/event-dispatcher'
import TransactionCreatedHandler from '../event/handler/transaction-created.handler'

export class TransactionFactory {
  static create(): TransactionFacadeInterface {
    const userRepository = new UserRepository()
    const userUseCase = new UserUseCase(userRepository)
    const userFacade = new UserFacade(userUseCase)
    const transactionRepository = new TransactionRepository()
    const authorizationService = new AuthorizationService()

    //notification
    const eventDispatcher = new EventDispatcher()
    const transactionEventHandler = new TransactionCreatedHandler()
    eventDispatcher.register('TransactionCreatedEvent', transactionEventHandler)

    const transactionUsecase = new TransactionUseCase(
      userFacade,
      transactionRepository,
      authorizationService,
      eventDispatcher,
    )

    const facade = new TransactionFacade(transactionUsecase)

    return facade
  }
}
