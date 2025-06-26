import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';

const ProceedToCheckout = ({ cartItems, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.totalPrice || item.price * (item.quantity || 1)), 0);

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>Order Summary</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <Box>
            {cartItems.map((item) => (
              <Box key={item.id} display="flex" justifyContent="space-between" my={1}>
                <span>{item.title} x {item.quantity || 1}</span>
                <span>${(item.totalPrice || (item.price * (item.quantity || 1))).toFixed(2)}</span>
              </Box>
            ))}
          </Box>
          <Typography variant="h6" mt={2}>Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={onCheckout}>
            Place Order
          </Button>
        </>
      )}
    </Paper>
  );
};

export default ProceedToCheckout; 