import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Badge, Button, Container } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import CartSubMEnuItem from './CartSubMEnuItem';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    popover: {
        width: 300,
        paddingTop: '15px',
        paddingBottom: '15px'
    },
    cartSubBtn: {
        marginTop: '8px'
    }

}));

const CartSubMenu = ({ cart }) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (

        <div className={classes.root}>
            <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon onClick={handleClick}
                    size="large"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined} />
            </Badge>
            <Popover
                id='simple-popover'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {cart.length > 0 ?
                    <Container className={classes.popover}>
                        <CartSubMEnuItem />
                        <Button onClick={handleClose} className={classes.cartSubBtn} color='primary' variant='contained' fullWidth>
                            <Link className={classes.link} to="/cart">Go to Shopping Cart </Link>
                        </Button>
                    </Container>
                    :
                    <Container className={classes.popover}>
                        <Typography className={classes.typography}>Cart is Empty!......</Typography>
                        <Button onClick={handleClose} className={classes.cartSubBtn} color='primary' variant='contained' fullWidth>
                            <Link className={classes.link} to="/">Add Products </Link>
                        </Button>
                    </Container>}

            </Popover>
        </div>
    )
}

export default CartSubMenu
