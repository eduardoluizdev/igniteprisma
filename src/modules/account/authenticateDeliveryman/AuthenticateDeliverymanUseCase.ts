import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliverymanDTO {
  username: string;
  password: string;
}

class AuthenticateDeliverymanUseCase {
  async execute({username, password}:IAuthenticateDeliverymanDTO) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error('username or password invalid.')
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error('username or password invalid.')
    }

    const token = sign({username}, '6927c662b7af5a2f123dee892fa22a40', {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticateDeliverymanUseCase }
