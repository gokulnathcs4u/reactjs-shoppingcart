import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const Rating = ({ rating, onClick, style }) => {
    return (
        <>
            {
                [...Array(5)].map((_, i) => (
                    <span key={i} onClick={() => onClick(i)} style={style}>
                        {rating > i ?
                            <StarIcon fontSize='medium' color='secondary' /> :
                            <StarBorderIcon fontSize='medium' color='secondary' />}
                    </span>
                )
                )
            }
        </>
    )
}

export default Rating
