import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const token = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [error, setError] = useState("")
  console.log(error)
  useEffect(() => {
    if (!token) {
      return
    }

    const fetchCart = async () => {
      const response = await
        fetch(
          `${BASE_URL}/cart`,
          { headers: {  Authorization: `Bearer ${token}`}}
        );

      if (!response.ok) {
        setError("Failed tot fetch user cart. please try again")
      }

      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.unitPrice,
        }))

      setCartItems(cartItemsMapped)
      setTotalAmount(cart.totalAmount);
    };

    fetchCart();
  }, [token])



  // console.log(setCartItems, setTotalAmount)

  const addItemToCart = async (productId: string) => {

    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        })
      });

      // if (!response.ok) {
      //   setError('Failed to add to cart')
      // }

      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        setError('Failed to add to cart');
        return; // Arrêtez l'exécution si la réponse n'est pas OK.
      }

      // const cart = await response.json()

      let cart;
      try {
        cart = await response.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        setError('Failed to parse cart data');
        return;
      }

      if (!cart) {
        setError('failed to parse cart data')
      }

      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.unitPrice,
        })
      );
      setCartItems([...cartItemsMapped])
      setTotalAmount(cart.totalAmount)
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart

      }}
    >
      {children}
    </CartContext.Provider>
  )

}

export default CartProvider