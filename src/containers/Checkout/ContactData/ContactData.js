import Input from '../../../components/UI/Input/input';
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux'; 
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {checkValidity} from '../../../shared/validation'; 


class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                            {value: 'fastest', display: 'Fastest'},
                            {value: 'cheapest', display: 'Cheapest'}]
                },
                value: 'Fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {}; 
        for (let formelementIdentifier in this.state.orderForm) {
            formData[formelementIdentifier] = this.state.orderForm[formelementIdentifier].value;  
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token); 
       
    }

    inputChangedHandler = (event, inputID) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {...updatedOrderForm[inputID]};

        updatedFormElement.value = event.target.value; 
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation); 
        updatedOrderForm[inputID] = updatedFormElement; 
        updatedFormElement.touched = true; 

        let formIsValid = true;
        for (let inputIds in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIds].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],

            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id} 
                    elementType={formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button disabled={!this.state.formIsValid} btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.reducer.ingredients,
        price: state.reducer.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId 
    }
};

const mapDispathToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}
export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(ContactData, axios)); 