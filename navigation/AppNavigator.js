import React from 'react';
// import ShopNavigator from './ShopNavigator';
import { useSelector } from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 
import ProductsOverviewScreen from '../screens/shop/ProductsOverViewScreen';


const MyStack=createStackNavigator();

const AppNavigator =props=>{

    const isAuth=useSelector(state=>!!state.auth.token);


return (
    <NavigationContainer>
        <MyStack.Navigator>
            <MyStack.Screen 
            name="ProductsOverView"
            component={ProductsOverviewScreen}
            />
        </MyStack.Navigator>
    </NavigationContainer>
);
};

export default AppNavigator;
