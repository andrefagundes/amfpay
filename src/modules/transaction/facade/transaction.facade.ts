import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import TransactionFacadeInterface, {
  TransactionFacadeInputDto,
  TransactionFacadeOutputDto,
} from './facade.interface'

export default class TransactionFacade implements TransactionFacadeInterface {
  private processTransactionUseCase: UseCaseInterface

  constructor(processTransactionUseCase: UseCaseInterface) {
    this.processTransactionUseCase = processTransactionUseCase
  }

  process(
    input: TransactionFacadeInputDto,
  ): Promise<TransactionFacadeOutputDto> {
    return this.processTransactionUseCase.execute(input)
  }
}
