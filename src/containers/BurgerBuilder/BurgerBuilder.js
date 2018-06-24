import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('https://react-my-burger-c7a5f.firebaseio.com/Ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    updatePurchaseState(newState) {
        const ingredients = {
            ...newState
        };

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({ purchaseable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.updatePurchaseState(updatedIngredients);
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.updatePurchaseState(updatedIngredients);
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    purchseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You Continue');

        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Brandon Blaschke',
                email: 'my@email.com',
                phone: '360-886-1234'
            }
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null; 
        let burger = this.state.error ? <p> Can't Load Ingredients</p>: <Spinner />; 

        if (this.state.ingredients) {
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientsRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchaseable}
                        ordered={this.purchaseHandler} />
                </Aux>);
            
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios); 