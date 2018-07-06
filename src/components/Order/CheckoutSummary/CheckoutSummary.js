import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';
import React from 'react';
import Burger from '../../Burger/Burger';

const checkoutSummary = (props) => {
    return ( 
        <div className={classes.CheckoutSummary}>
            <h1>Hope you enjoy</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkOutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkOutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;