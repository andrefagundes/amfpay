import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import UserFacadeInterface, {
  UserFacadeInputDto,
  UserFacadeOutputDto,
} from './facade.interface'

export default class UserFacade implements UserFacadeInterface {
  constructor(private checkBalanceUseCase: UseCaseInterface) {}
  process(input: UserFacadeInputDto): Promise<UserFacadeOutputDto> {
    return this.checkBalanceUseCase.execute(input)
  }
}
