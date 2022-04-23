import { FormControl, IconButton, InputLabel, ListItem, ListItemText, MenuItem, Paper, Select } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCartContext } from '../context/context';
import Rating from './Ratting';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    cartItems: {
        width: '25%',
        paddingRight: '15px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

const CartItems = ({ item }) => {
    const { dispatch } = useCartContext();

    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>

            <ListItem>
                <div style={{ paddingRight: '5%' }}>
                    <img
                        alt={item.name}
                        height="95"
                        width="150"
                        src={item.image}
                        title={item.name}
                    />
                </div>

                <div className={classes.cartItems} >

                    <ListItemText primary={item.name} />
                    <Rating rating={item.ratings}></Rating>
                </div>

                <ListItemText primary={item.price} />

                <div className={classes.cartItems}>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={item.quantity}
                            onChange={(e) => {
                                dispatch({
                                    type: 'CHANGE_CART_QTY',
                                    payload: {
                                        id: item.id,
                                        quantity: e.target.value
                                    }
                                })
                            }}
                        >
                            {[...Array(item.inStock).keys()]
                                .map(val => <MenuItem value={val + 1}>{val + 1}</MenuItem>)}

                        </Select>
                    </FormControl>
                </div>

                <IconButton onClick={() => {
                    dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item.id
                    })
                }}>
                    <DeleteIcon color='secondary' />
                </IconButton>
            </ListItem>
        </Paper >
    )
}

export default CartItems
