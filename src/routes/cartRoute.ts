

import express from "express";
import { addItemToCart, GetActiveCartForUser } from "../services/cartService";

import validateJWT from "../middlewares/validateJWT"
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get(
  '/',
  validateJWT,
  async (req: ExtendRequest, res) => {

    //TO DO : get the userId from the jwt, after vailditing from middleware
    const userId = req.user._id;
    const cart = await GetActiveCartForUser({ userId });
    res.status(200).send(cart)
  },
);


router.post(
  '/items',
  validateJWT,
  async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({userId, productId, quantity,   })
    res.status(response.statusCode).send(response.data)
  }
);

export default router

