import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import UserFacadeInterface, {
  UserFacadeInputDto,
  UserFacadeOutputDto,
} from './facade.interface'

export default class UserFacade implements UserFacadeInterface {
  private userUseCase: UseCaseInterface

  constructor(userUseCase: UseCaseInterface) {
    this.userUseCase = userUseCase
  }

  find(input: UserFacadeInputDto): Promise<UserFacadeOutputDto> {
    return this.userUseCase.execute(input)
  }
}
