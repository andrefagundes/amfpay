import UserFacadeInterface from '../facade/facade.interface'
import UserFacade from '../facade/user.facade'
import UserRepository from '../repository/user.repository'
import UserUseCase from '../usecase/check-balance/check-balance.usecase'

export class UserFactory {
  static create(): UserFacadeInterface {
    const repository = new UserRepository()
    const usecase = new UserUseCase(repository)
    const facade = new UserFacade(usecase)
    return facade
  }
}
