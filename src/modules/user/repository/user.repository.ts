import { PrismaClient } from '@prisma/client'
import User from '../domain/user.entity'
import UserGateway from '../gateway/user.gateway'
import Id from '../../@shared/domain/value-object/id.value-object'

const prisma = new PrismaClient()

export default class UserRepository implements UserGateway {
  async findById(userId: string): Promise<Omit<User, 'password'>> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return new User({
      id: new Id(user.id),
      document: user.document,
      fullName: user.fullName,
      email: user.email,
      wallet: user.wallet,
    })
  }
}
