import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {

  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;

}

interface GetActiveCartForUser {
  userId: string;
}

export const GetActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {

  let cart = await cartModel.findOne({ userId, status: "active" });


  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
}

interface addItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async (
  { productId, quantity, userId }: addItemToCart) => {
  const cart = await GetActiveCartForUser({ userId });

  //Does the item exist in the cart?
  const existsInCart = cart.items.find((p) => { p.product.toString() === productId })

  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 }
  }


  //fetch the product
  const product = await productModel.findById(productId)

  if (!product) {
    return { data: "product not found!", statusCode: 400 }
  }

  if (product.stock < quantity) {
    return { data: "low stock for item", statusCode: 400 }
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity

  });
  //update the totalAmount for the cart
  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 }

}

interface UpdateItemInCart {
  productId: any;
  quantity: number;
  userId: string;
}


export const updateItemInCart = async (
  { productId,
    quantity,
    userId,
  }: UpdateItemInCart) => {

  const cart = await GetActiveCartForUser({ userId })


  const existsInCart = cart.items.find((p) => p.product.toString() === productId)

  if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 }
  }


  const product = await productModel.findById(productId)

  if (!product) {
    return { data: "product not found!", statusCode: 400 }
  }

  if (product.stock < quantity) {
    return { data: "low stock for item up", statusCode: 400 }
  }



  const otherCartItems = cart.items.filter((p) =>
    p.product.toString() !== productId)



  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0)


  existsInCart.quantity = quantity;

  total += existsInCart.quantity * existsInCart.unitPrice;
  cart.totalAmount = total;
  const updatedCart = await cart.save()

  return { data: updatedCart, statusCode: 200 }

}