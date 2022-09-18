import { Deliveryman } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliverymanDTO {
  username: string;
  password: string;
}

class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliverymanDTO): Promise<Deliveryman> {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    }) 

    if (deliverymanExist) {
      throw new Error('Deliveryman already exists')
    }

    const hashPassword = await hash(password, 10)

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      }
    })

    return deliveryman
  }
}

export { CreateDeliverymanUseCase };