import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';
import {connect} from 'react-redux'; 


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        // axios.get('https://react-my-burger-c7a5f.firebaseio.com/Ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // });
    }

    updatePurchaseState(ingredients) {
    
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return  sum > 0 ;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null; 
        let burger = this.state.error ? <p> Can't Load Ingredients</p>: <Spinner />; 

        if (this.props.ings) {
            burger = (
                <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>);
            
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.price}
            purchaseCanceled={this.purchseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;

        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />; 
        }

        return (

            <Aux>
                <Modal modalClosed={this.purchseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispathToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(BurgerBuilder, axios)); 