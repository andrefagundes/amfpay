import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('senha123', 10)

  await prisma.user.createMany({
    data: [
      {
        email: 'andremacielfagundes@example.com',
        fullName: 'André Maciel Fagundes',
        document: '92945874587',
        wallet: 1000,
        password: hashedPassword,
      },
      {
        email: 'adriano@example.com',
        fullName: 'Adriano Henrique',
        document: '65478458748',
        wallet: 100,
        password: hashedPassword,
      },
      {
        email: 'empresa@example.com',
        fullName: 'Empresa D',
        document: '56458795000132',
        wallet: 50,
        password: hashedPassword,
      },
    ],
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
