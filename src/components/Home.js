import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react'
import { useCartContext } from '../context/context';
import Product from './Product';

import SideBar from './SideBar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingLeft: '10px',
        paddingBottom: '15px',
        paddingRight: '10px'
    }
}));

const Home = () => {

    const { state: { productsArray },
        productstate: { byStock, byFastDelivery, byRating, searchQuery, sort } } = useCartContext();

    const transformProducts = () => {
        let sortedProducts = productsArray;
        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) => (
                sort === 'lowtohigh' ? a.price - b.price : b.price - a.price
            ))
        }
        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter(item => item.fastDelivery)
        }
        if (!byStock) {
            sortedProducts = sortedProducts.filter(item => item.inStock)
        }
        if (byRating) {
            sortedProducts = sortedProducts.filter(item => item.ratings >= byRating)
        }
        if (searchQuery) {
            sortedProducts = sortedProducts.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return sortedProducts;
    }

    const classes = useStyles();

    return (
        <div>
            <Grid container justifyContent="center" className={classes.root} spacing={1}>
                <Grid item spacing={1} md={2}>
                    <Paper className={classes.paper}>
                        <SideBar />
                    </Paper>

                </Grid>
                <Grid item spacing={1} md={10} >
                    <Grid container justifyContent="center" className={classes.root} spacing={1}>
                        {transformProducts().length > 0 ?
                            transformProducts().map((item) => <Product item={item} key={item.id} />) :
                            <Grid><p>No items found.....</p></Grid>}
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}

export default Home
