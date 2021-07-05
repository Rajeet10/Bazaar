import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import ProductsOverviewScreen, {
  screenOptions as productsOverViewScreenOptions,
} from "../screens/shop/ProductsOverViewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductsDetailScreen";
import Colors from "../constants/Colors";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: "open-sans-bold",
  headerTintColor: Platform.OS === "android" ? "white" : "",
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

// const ProductsNavigator=createStackNavigator({
// ProductsOverView:ProductsOverviewScreen,
// ProductDetail:ProductDetailScreen,
// Cart:CartScreen,
// },{
//     defaultNavigationOptions:defaultNavOptions
// });

// const OrdersNavigator=createStackNavigator({
//     Orders:OrdersScreen
// },{
//     defaultNavigationOptions:defaultNavOptions
// });

// const ShopNavigator=createDrawerNavigator({
// Products:ProductsNavigator,
// Orders:OrdersNavigator
// },{
//     contentOptions:{
//          activeTintColor:Colors.primary
//     }
// });

const ProductStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    // <NavigationContainer>
      <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductStackNavigator.Screen
          name="ProductsOverView"
          component={ProductsOverviewScreen}
          options={productsOverViewScreenOptions}
        />
        <ProductStackNavigator.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={productDetailScreenOptions}
        />
        <ProductStackNavigator.Screen
          name="Cart"
          component={CartScreen}
          options={cartScreenOptions}
        />
      </ProductStackNavigator.Navigator>
    // </NavigationContainer>
  );
};
const OrderStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrderStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrderStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

const ShopNavigator = () => {
  return (
      <NavigationContainer>
    <ShopDrawerNavigator.Navigator
    drawerContentOptions={{
        activeTintColor:Colors.primary
    }}>
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
            drawerIcon:props=>(
                <Ionicons 
                name={Platform.OS==='android'?'md-cart':'ios-cart'}
                size={23}
                color={props.color}/>
            )
        }}
      />
      <ShopDrawerNavigator.Screen 
      name="Orders" 
      component={OrdersNavigator} 
      options={{
          drawerIcon:props=>(
              <Ionicons 
              name={Platform.OS==='android'?'md-list':'ios-list'}
              size={23}
              color={props.color}/>
          )
      }}
      />
    </ShopDrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
