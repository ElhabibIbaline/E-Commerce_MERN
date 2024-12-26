

import express from "express";
import { GetActiveCartForUser } from "../services/cartService";

import validateJWT from "../middlewares/validateJWT"

const router = express.Router();

router.get(
  '/',
  validateJWT,
  async (req:any, res) => {

    //TO DO : get the userId from the jwt, after vailditing from middleware
    const userId = req.user._id;
    const cart = await GetActiveCartForUser({ userId });
    res.status(200).send(cart)
  },
);

export default router