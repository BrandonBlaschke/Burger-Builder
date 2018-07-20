import * as actionTypes from '../actions/actions';

const initialState = {
    orders: [],
    loading: false,
    pruchase: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state, 
                laoding: false
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchase: false
            }
        case actionTypes.PURHCASE_BURGER_START:
            return {
                ...state, 
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS: 
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };

            return {
                ...state,
                loading: false,
                purchase: true,
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