import { Request, Response } from "express";
import { FindAllDeliveriesDeliverymanUseCase } from "./FindAllDeliveriesDeliverymanUseCase";

class FindAllDeliveriesDeliverymanController  {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request

    const findAllDeliveriesDelivermanUseCase = new FindAllDeliveriesDeliverymanUseCase()
    const deliveries = await findAllDeliveriesDelivermanUseCase.execute(id_deliveryman)

    return response.json(deliveries)
  }
}

export { FindAllDeliveriesDeliverymanController }