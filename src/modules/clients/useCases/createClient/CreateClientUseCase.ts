import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateClientDTO {
  username: string;
  password: string;
}

class CreateClientUseCase {

  async execute({username, password}:ICreateClientDTO) {
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    })

    if (clientExist) {
      throw new Error('Client already exists')
    }

    const hashPassword = await hash(password, 10)

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      }
    })

    return client
  }
} 

export { CreateClientUseCase }