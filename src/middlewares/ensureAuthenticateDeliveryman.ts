import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing"
    })
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "6927c662b7af5a2f123dee892fa22a40") as IPayload;

    request.id_deliveryman = sub;

    return next()
  } catch(err) {
    return response.status(401).json({
      message: "Invalid token"
    })
  }
}

export { ensureAuthenticateDeliveryman };