import { prisma } from "../../../../database/prismaClient"

class FindAllDeliveriesDeliverymanUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman
      },
      select: {
        id: true,
        username: true,
        deliveries: true
      }
    })

    return deliveries
  }
}

export {FindAllDeliveriesDeliverymanUseCase}