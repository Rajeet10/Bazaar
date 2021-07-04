export const ADD_ORDER='ADDD_ORDER';

export const addOrder=(cartItems,totalAmount)=>{
    return{
        type:ADD_ORDER,
        orderData:{items:cartItems,amount:totalAmount}
    };
};