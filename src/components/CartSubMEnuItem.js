import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, IconButton, Paper } from '@material-ui/core';
import { useCartContext } from '../context/context';

const useStyles = makeStyles((theme) => ({
    cartSubitem: {
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        paddingBottom: '5px',
        paddingTop: '5px',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, cartSubitemDesc: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12
    },
    cartSubitemImg: {
        borderRadius: '50%'
    }
}));

const CartSubMEnuItem = () => {

    const { state: { cart }, dispatch } = useCartContext();
    const classes = useStyles();
    return (
        <>
            {cart.map(item => {
                return (<Paper elevation={3} >
                    <div className={classes.cartSubitem}>
                        <Avatar>
                            <img className={classes.cartSubitemImg}
                                alt={item.name}
                                height="65"
                                src={item.image}
                                title={item.name}
                            />
                        </Avatar>
                        <div className={classes.cartSubitemDesc}>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                        </div>
                        <IconButton onClick={() => {
                            dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: item.id
                            })
                        }}>
                            <DeleteIcon color='secondary' />
                        </IconButton>
                    </div>
                </Paper>)
            })}
        </>
    )
}

export default CartSubMEnuItem
