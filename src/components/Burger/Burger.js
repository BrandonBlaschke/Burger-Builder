import React from 'react';
import classes from './Burger.css';
import {withRouter} from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {


    //Ok so this is getting the ingredients state object and we first make an array of all the keys, so 4
    //then map a funtion (1) that returns an another array of the number of times that ingredient is added
    //function (2), and with that we use the igKey from (1) to fill in the type for the ingredient
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => { //Function 1
            return [...Array(props.ingredients[igKey])].map((_, i) => ( //Funtion (2)
                <BurgerIngredient key={igKey + i} type={igKey} />
            ));
        }).reduce((arr, el) => { //Reduce here is just taking each element from the array and concating any values
            return arr.concat(el)
        }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger); 