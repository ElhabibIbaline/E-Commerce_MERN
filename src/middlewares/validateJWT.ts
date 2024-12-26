


import { Request, Response, NextFunction } from "express";


import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import 'express';


interface ExtendRequest extends Request {
  user?: any;
}

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get('authorization');

  if (!authorizationHeader) {
    res.status(403).send("authorization header was not provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];
  //if(!token) = if(token === underfinde || token === null || token === '')
  if (!token) {
    res.status(403).send("Bearer token not found");
    return;
  }

  jwt.verify(token, 'hldxfeLPjCW7e2jAcmEpy7G2JDEbTEFS', async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token")
      return;
    }

    if (!payload) {
      res.send(403).send('invalid token payload')
      return;
    }

    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string
    }

    // fetch user from database based on the payload
    const user = await userModel.findOne({ email: userPayload.email });
    // req.user = token as { _id: string };

    // if(!user){
    //   res.status(400).send('User not found');
    //   return;
    // }
    req.user = user;
    next();

  });

}

export default validateJWT