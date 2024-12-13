import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 50 },
    { id: 2, name: "Product 2", price: 100 },
  ]);

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    setCartItems([]);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3 }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price}`}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveItem(item.id)}
                  sx={{ padding: "6px 12px", fontSize: 14 }}
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>

          <Stack
            container
            spacing={2}
            justifyContent="flex-end"
            sx={{ marginTop: 2 }}
          >
            <Stack item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${calculateTotal()}
                </Typography>
              </Box>
            </Stack>
            <Stack item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePlaceOrder}
                sx={{ padding: "12px", fontSize: 16 }}
              >
                Place Order
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Cart;
