import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seedData() {
  const hashedPassword = await bcrypt.hash('senha123', 10)

  const usersToCreate: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      email: 'andremacielfagundes@example.com',
      fullName: 'André Maciel Fagundes',
      document: '92945874587',
      wallet: 1000,
      password: hashedPassword,
      isMerchant: false,
    },
    {
      email: 'adriano@example.com',
      fullName: 'Adriano Henrique',
      document: '65478458748',
      wallet: 10000,
      password: hashedPassword,
      isMerchant: false,
    },
    {
      email: 'empresa@example.com',
      fullName: 'Empresa D',
      document: '56458795000132',
      wallet: 50,
      password: hashedPassword,
      isMerchant: true,
    },
  ]

  for (const user of usersToCreate) {
    const existingUser = await prisma.user.findFirst({
      where: {
        document: user.document,
      },
    })

    if (!existingUser) {
      await prisma.user.create({
        data: user as User,
      })
    }
  }

  await prisma.$disconnect()
}

seedData().catch((err) => {
  throw err
})
