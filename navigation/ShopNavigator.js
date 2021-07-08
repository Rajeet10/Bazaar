import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform,View,Button,SafeAreaView } from "react-native";
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
import { createDrawerNavigator,DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen,{screenOptions as userProductsScreenOptions} from "../screens/user/UserProductsScreen";
import EditProductScreen,{screenOptions as editProductScreenOptions} from "../screens/user/EditProductScreen";
import AuthScreen,{screenOptions as authScreenOptions} from "../screens/user/AuthScreen";
import { useDispatch } from "react-redux";
import * as authActions from '../store/actions/auth';



const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily:'open-sans-bold'
  },
  headerTintColor: Platform.OS === "android" ? "white" : "",
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};


const ProductStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
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

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProducts"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
 const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
    drawerContent={props=>{
      return(
        <View style={{flex:1,paddingTop:20}}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItemList {...props}/>
          <Button
          title="Logout"
          color={Colors.primary}
          onPress={()=>{
            dispatch(authActions.logout());
            // props.navigation.navigate('Auth');
          }}
            />
          </SafeAreaView>

        </View>
      );
    }}
  drawerContentOptions={{
    activeTintColor:Colors.primary
}}
  >
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
      <ShopDrawerNavigator.Screen 
      name="Admin" 
      component={AdminNavigator} 
      options={{
        drawerIcon: props => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={props.color}
          />
        )
      }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

AuthStackNavigator=createStackNavigator();

export const Authnavigator=()=>{
  return(
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
      name="Auth"
      component={AuthScreen}
      options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
}

// const MainNavigator=createSwitchNavigator({
//   Startup:StartupScreen,
//   Auth:Authnavigator,
//   Shop:ShopNavigator,
  
// },{
//   initialRouteName:"Auth"
// });

export default ShopNavigator;
// export default createAppContainer(MainNavigator); 
