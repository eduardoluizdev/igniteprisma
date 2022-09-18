import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";

interface IAuthenticateClientDTO {
  username: string;
  password: string;
}

class AuthenticateClientUseCase {
  async execute({username, password}:IAuthenticateClientDTO) {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error('username or password invalid.')
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error('username or password invalid.')
    }

    const token = sign({username}, '6927c662b7af5a2f123dee892fa22a36', {
      subject: client.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticateClientUseCase }
