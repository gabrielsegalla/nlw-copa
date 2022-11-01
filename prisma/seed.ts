import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar_url: 'https://github.com/gabrielsegalla.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Example pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create:{
          userId: user.id
        }
      }
    }
  })

 await prisma.game.create({
    data:{
      date:'2022-11-01T13:43:45.766Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data:{
      date:'2022-11-02T13:43:45.766Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guesses :{
        create:{
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant:{
            connect:{
              userId_poolId:{
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
  
}

main()