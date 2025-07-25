import { Divider, IconButton, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box, fontSize } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { handleDecreaseQuantity, handleIncreaseQuantity, removeFormCart } from '../store/actions/productActions';
import ProceedToCheckout from './ProceedToCheckout';
import checkout from '../api/checkout';
import { useState } from 'react';


function CartComponent() {
    const Cart = useSelector((state) => state.cart.products)
    const dispatch = useDispatch();
    const [orderSuccess, setOrderSuccess] = useState(false);
    // console.log(Cart);

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const handleCheckout = async () => {
        const userId = localStorage.getItem("userId");
        const response = await checkout({ userId, cart: Cart });
        if (response && response.status === 200) {
            setOrderSuccess(true);
        }
    };

    return (<>
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
                <Box mt={4}>
                    <Typography variant='h4' align='center' gutterBottom>Your Cart</Typography>
                    {Cart.length === 0 ? (
                        <Typography variant='h5' align='center'>Your cart is Empty</Typography>
                    ) : (
                        Cart.map((item) => (
                            <Paper
                            key={item.id}
                                elevation={3}
                                style={{marginBottom:"16px"}}
                            >
                                <Box p={3} display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                    <Typography variant='h6'>{item.title}</Typography>
                                    <Typography color="text.secondary">Price: ${item.totalPrice ? item.totalPrice : item.price.toFixed(2)}</Typography>
                                    <Typography>Quantity: {item.quantity ? item.quantity : 1}</Typography>
                                    </Box>
                                    <Box>
                                       <img src={item.image.length > 0 ? item.image[0] : item.image} alt="Product Image" height={80} width={80} />
                                    </Box>
                                </Box>
                                <Divider />
                                <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
                                    <Box>
                                        <IconButton sx={{ fontSize: "30px", padding: "0 12px" }}
                                        onClick={()=> dispatch(handleDecreaseQuantity(item.id))}>
                                            -
                                        </IconButton>
                                        <IconButton sx={{ fontSize: "30px", padding: "0 12px" }}
                                        onClick={()=> dispatch(handleIncreaseQuantity(item.id))}>
                                            +
                                        </IconButton>
                                    </Box>
                                    <Box>
                                        <ColorButton variant="contained"   
                                        onClick={()=> dispatch(removeFormCart(item.id))}>Remove</ColorButton>
                                    </Box>
                                </Box>
                            </Paper>
                        ))
                    )}
                     {Cart.length === 0 ? "" : (
                        <ProceedToCheckout cartItems={Cart} onCheckout={handleCheckout} />
                     )}
                     {orderSuccess && (
                        <Typography variant="h6" color="success.main" align="center" mt={2}>
                            Order placed successfully!
                        </Typography>
                     )}
                </Box>

            </Grid>
        </Grid>

    </>)
}

export default CartComponent;