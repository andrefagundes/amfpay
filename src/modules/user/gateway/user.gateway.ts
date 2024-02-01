import User from '../domain/user.entity'

export default interface UserGateway {
  findById(userId: string): Promise<Omit<User, 'password'> | null>
}
