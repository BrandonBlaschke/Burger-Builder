import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions/index';
import {connect} from 'react-redux'; 


export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients(); 
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

        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth'); 
        }
    }

    purchseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase(); 
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
        let burger = this.props.error ? <p> Can't Load Ingredients</p>: <Spinner />; 

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
                        ordered={this.purchaseHandler} 
                        isAuth={this.props.isAuthenticated}/>
                </Aux>);
            
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.price}
            purchaseCanceled={this.purchseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;

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
        ings: state.reducer.ingredients,
        price: state.reducer.totalPrice,
        error: state.reducer.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispathToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirect(path))
    };
}

export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(BurgerBuilder, axios)); 