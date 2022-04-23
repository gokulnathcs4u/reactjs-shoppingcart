import React from 'react'
import { AppBar, TextField, makeStyles, Toolbar, Typography, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/context';

import CartSubMenu from './CartSubMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-around'
    },

    searchBox: {
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '30%'
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    }
}));

const Header = () => {

    const { state: { cart }, productdispatch, productstate: { searchQuery } } = useCartContext();

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to="/">Shopping Cart</Link>
                    </Typography>
                    <TextField
                        className={classes.searchBox}
                        id="input-with-icon-textfield"
                        placeholder="Search here"
                        value={searchQuery}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" variant='outlined' >
                                    <SearchIcon color='primary' />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => {
                            productdispatch({
                                type: 'FILTER_BY_SEARCHQUERY',
                                payload: e.target.value
                            })
                        }}
                    />
                    <CartSubMenu cart={cart} />

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header