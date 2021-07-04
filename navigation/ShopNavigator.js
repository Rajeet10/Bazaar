import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import ProductsOverviewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductsDetailScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';

const defaultNavOptions={
    headerStyle:{
        backgroundColor:Platform.OS==='android'? Colors.primary:''
    },
    headerTitleStyle:'open-sans-bold',
    headerTintColor:Platform.OS==='android'?'white':"",
    headerBackTitleStyle:{
        fontFamily:'open-sans',
    },
}

const ProductsNavigator=createStackNavigator({
ProductsOverView:ProductsOverviewScreen,
ProductDetail:ProductDetailScreen,
Cart:CartScreen,
},{
    defaultNavigationOptions:defaultNavOptions
});

const OrdersNavigator=createStackNavigator({
    Orders:OrdersScreen
},{
    defaultNavigationOptions:defaultNavOptions
});

// const ShopNavigator=createDrawerNavigator({
// Products:ProductsNavigator,
// Orders:OrdersNavigator
// },{
//     contentOptions:{
//         activeTintCOlor:Colors.primary
//     }
// });
export default createAppContainer(ProductsNavigator);