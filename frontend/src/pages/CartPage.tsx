import Typography from "@mui/material/Typography"
import { Box } from "@mui/material";
import Container from "@mui/material/Container"
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";


const CartPage = () => {

  const token = useAuth()
  const [cartItems, totalAmount] = useCart();
  const [error, setError] = useState('');




  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">  My Cart  </Typography>
      {cartItems.map(({item}) => (
        <Box> {item.title} </Box>
      ))}
    </Container>
  )
}

export default CartPage

