import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup, Checkbox, FormGroup, Box, Button, Divider } from '@material-ui/core';
import React from 'react'
import { useCartContext } from '../context/context';
import Rating from './Ratting';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    listItem: {
        marginTop: 20,
        paddingTop: '10px',
        borderRadius: 5
    }
}));

const SideBar = () => {
    const classes = useStyles();

    const { productstate:
        { byStock, byFastDelivery, byRating, sort }, productdispatch } = useCartContext();

    return (
        <Box color='primary' className={classes.listItem}>
            <FormControl size='small' variant='outlined' component="fieldset">
                <FormLabel component="h1" >Filter Products</FormLabel>
                <RadioGroup name="customized-radios">
                    <FormControlLabel
                        value="ascending"
                        control={<Radio size='small' checked={sort === 'lowtohigh'} onClick={() => {
                            productdispatch({
                                type: 'SORT_BY_PRICE',
                                payload: 'lowtohigh'
                            })
                        }} color="primary" />}
                        label="Ascending" />
                    <FormControlLabel
                        value="descending"
                        control={<Radio size='small' checked={sort === 'hightolow'} onClick={() => {
                            productdispatch({
                                type: 'SORT_BY_PRICE',
                                payload: 'hightolow'
                            })
                        }} color="primary" />}
                        label="Descending" />
                </RadioGroup>
                <FormGroup >
                    <FormControlLabel
                        value="outofstock"
                        control={<Checkbox checked={byStock} size='small' onClick={() => {
                            productdispatch({
                                type: 'FILTER_BY_STOCK',
                            })
                        }} color="primary" />}
                        label="Include Out of stock"
                    />
                    <FormControlLabel
                        value="fast"
                        control={<Checkbox checked={byFastDelivery} size='small' onClick={() => {
                            productdispatch({
                                type: 'FILTER_BY_FASTDELIVERY',
                            })
                        }} color="primary" />}
                        label="Fast Delivery Only"
                    />
                </FormGroup>
                <FormGroup >
                    <FormControlLabel style={{ marginLeft: '1px', marginTop: '5px' }}
                        control={<Rating
                            onClick={(i) =>
                                productdispatch({
                                    type: 'FILTER_BY_RATING',
                                    payload: i + 1
                                })}
                            rating={byRating}
                            style={{ cursor: 'pointer' }} />}
                        label="Rating"
                    />
                </FormGroup>

                <Button style={{ marginTop: '15px' }} onClick={() => {
                    productdispatch({
                        type: 'CLEAR_FILTERS',
                    })
                }} variant='contained' color='secondary'>Clear Filters</Button>
            </FormControl>

        </Box>
    )
}

export default SideBar
