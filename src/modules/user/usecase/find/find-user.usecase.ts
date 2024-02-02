import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import UserGateway from '../../gateway/user.gateway'
import { UserInputDto, UserOutputDto } from './find-user.dto'

export default class UserUseCase implements UseCaseInterface {
  private userRepository: UserGateway

  constructor(userRepository: UserGateway) {
    this.userRepository = userRepository
  }

  async execute(
    input: UserInputDto,
  ): Promise<UserOutputDto | null> {
    const user = await this.userRepository.findById(input.userId)

    if (!user.id) {
      return null
    }

    return {
      fullName: user.fullName,
      document: user.document,
      wallet: user.wallet,
      email: user.email,
      isMerchant: user.isMerchant
    }
  }
  catch(error: any) {
    throw new Error('Error when searching for user')
  }
}
