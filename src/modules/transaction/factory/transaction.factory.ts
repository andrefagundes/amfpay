import UserFacade from '../../user/facade/user.facade'
import TransactionFacadeInterface from '../facade/facade.interface'
import TransactionFacade from '../facade/transaction.facade'
import TransactionRepository from '../repository/transaction.repository'
import TransactionUseCase from '../usecase/process-transaction/process-transaction.usecase'
import UserUseCase from '../../user/usecase/find/find-user.usecase'
import UserRepository from '../../user/repository/user.repository'
import { AuthorizationService } from '../service/authorization.service'

export class TransactionFactory {
  static create(): TransactionFacadeInterface {
    const userRepository = new UserRepository()
    const useCase = new UserUseCase(userRepository)
    const userFacade = new UserFacade(useCase)
    const transactionRepository = new TransactionRepository()
    const authorizationService = new AuthorizationService()

    const transactionUsecase = new TransactionUseCase(
      userFacade,
      transactionRepository,
      authorizationService,
    )

    const facade = new TransactionFacade(transactionUsecase)

    return facade
  }
}
