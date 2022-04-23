import { Button, Card, Container, Divider, Grid, List, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/context';
import CartItems from './CartItems';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: "80vh",
        width: "100%",
        color: '#fff',
        backgroundColor: '#3f51b5',
        marginTop: '10px',
    },
    container: {
        padding: theme.spacing(2),
    }
}));

const Cart = () => {
    const { state: { cart } } = useCartContext();

    const [totalCart, settotalCart] = useState({});

    useEffect(() => {
        settotalCart(cart.reduce((total, initial) => {
            total.items.push({
                id: initial.id,
                name: initial.name,
                quantity: +initial.quantity,
                amount: +initial.price * +initial.quantity
            })
            total.totalQuantity += +initial.quantity
            total.totalPrice += +initial.price * +initial.quantity
            return total;
        }, {
            items: [],
            totalQuantity: 0,
            totalPrice: 0
        }))
    }, [cart])

    const classes = useStyles();

    return (
        <div>
            <Grid container justifyContent="center" className={classes.root} spacing={1}>

                <Grid item spacing={1} md={9}>
                    <Grid container justifyContent="flex-start" className={classes.root} spacing={1}>
                        <Container className={classes.container}>
                            <List >
                                {cart.map((item) =>
                                    <CartItems key={item.id} item={item} />
                                )}
                            </List>
                        </Container>
                    </Grid>
                </Grid>
                <Grid item spacing={1} md={3} >
                    <Paper className={classes.paper}>
                        <Container className={classes.container}>
                            <Typography component='h1'>
                                Summary
                            </Typography>
                            <Card className={classes.container}>
                                {totalCart.items && totalCart.items.map((item) => {
                                    return (
                                        <Typography component='p' style={{ fontSize: '15px' }} key={item.id}>
                                            {item.name} ({item.quantity}) {'=>'} <b>${item.amount}</b>
                                        </Typography>
                                    );
                                })}
                            </Card>
                            <Divider style={{ color: 'white' }} />
                            <Typography >
                                SubTotal ({totalCart.totalQuantity}) items
                            </Typography>
                            <Typography component='h1'>
                                Total ${totalCart.totalPrice}
                            </Typography>
                            <Button color='secondary' variant='contained' fullWidth>
                                Proceed to checkout
                            </Button>

                        </Container>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}

export default Cart
