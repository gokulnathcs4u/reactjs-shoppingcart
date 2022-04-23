import { Button, Card, CardContent, CardMedia, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useCartContext } from '../context/context';
import Rating from './Ratting';


const useStyles = makeStyles((theme) => ({
    root: {
        width: 250,
    },
    paper: {
        marginTop: 20
    },
    productInfo: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    productquantity: {
        width: '20%'
    },
    addTocartBtn: {
        padding: '10px 0 0 0'
    }
}));

const Product = ({ item }) => {
    const { state: { cart }, dispatch } = useCartContext();
    const classes = useStyles();
    return (

        <Grid item>
            <Paper className={classes.paper} >
                <Card className={classes.root}>

                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="120"
                        image={item.image}
                        title="Contemplative Reptile"
                    />
                    <CardContent >
                        <div className={classes.productInfo}>
                            <Typography variant="body2" component="p">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                <b>${item.price.substring(0, 3)}</b>
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="caption" component="p">
                                <i>{item.fastDelivery ? "Fast Delivery" : "4 Days delivery"}</i>
                            </Typography>
                        </div>
                        <div>
                            <Rating rating={item.ratings} />
                        </div>
                        {cart.some(cartitem => cartitem.id === item.id)
                            ? <IconButton onClick={() => {
                                dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: item.id
                                })
                            }} color='primary' className={classes.addTocartBtn}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"

                                >
                                    Remove from cart
                                </Button>
                            </IconButton>
                            : <IconButton onClick={() => {
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: item
                                })
                            }} color='primary' className={classes.addTocartBtn}>
                                <Button
                                    size="small"
                                    disabled={!item.inStock}
                                    variant="contained"
                                    color="primary"

                                >
                                    {item.inStock !== 0 ? "Add to cart" : "Out of Stock"}
                                </Button>
                            </IconButton>
                        }
                    </CardContent>

                </Card>
            </Paper>
        </Grid>
    )
}

export default Product
