import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom'; 
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'; 

class Checkout extends Component {

    checkOutCancelledHandler = () => {
        this.props.history.goBack(); 
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data'); 
    }
    
    render() {
        let summary = <Redirect to="/"/>
        
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchase ? <Redirect to='/' /> : null; 
            summary = (<div>
                            {purchasedRedirect}
                            <CheckoutSummary ingredients={this.props.ings}
                            checkOutCancelled={this.checkOutCancelledHandler}
                            checkOutContinued={this.checkOutContinuedHandler}/>
                            <Route path={this.props.match.url + '/contact-data'} 
                            component={ContactData}/>
                        </div>
                )
        }
        return summary; 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.reducer.ingredients,
        purchase: state.order.purchase
    }
}


export default connect(mapStateToProps)(Checkout); 