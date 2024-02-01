import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import UserGateway from '../../gateway/user.gateway'
import {
  CheckBalanceInputDto,
  CheckBalanceOutputDto,
} from './check-balance.dto'

export default class UserUseCase implements UseCaseInterface {
  private userRepository: UserGateway

  constructor(userRepository: UserGateway) {
    this.userRepository = userRepository
  }

  async execute(
    input: CheckBalanceInputDto,
  ): Promise<CheckBalanceOutputDto | null> {
    const user = await this.userRepository.findById(input.senderId)

    if (!user.id) {
      return null
    }

    const isBalance = user.wallet >= input.value

    return {
      isBalance,
    }
  }
  catch(error: any) {
    throw new Error('Erro ao verificar saldo')
  }
}
