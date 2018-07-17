import * as actionTypes from '../actions/actions';

const initialState = {
    orders: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURHCASE_BURGER_START:
            return {
                ...state, 
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS: 
            const newOrder = {
                ...action.orderData,
                id: actoin.orderId
            };

            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder) 
            }; 
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }; 
        default:
            return state; 
    }
};

export default reducer; 