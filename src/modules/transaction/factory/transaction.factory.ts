import TransactionFacadeInterface from '../facade/facade.interface'
import TransactionFacade from '../facade/transaction.facade'
import TransactionRepository from '../repository/transaction.repository'
import TransactionUseCase from '../usecase/process-transaction/process-transaction.usecase'

export class TransactionFactory {
  static create(): TransactionFacadeInterface {
    const repository = new TransactionRepository()
    const usecase = new TransactionUseCase(repository)
    const facade = new TransactionFacade(usecase)
    return facade
  }
}
