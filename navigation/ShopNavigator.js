import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import ProductsOverviewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductsDetailScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';

const ProductsNavigator=createStackNavigator({
ProductsOverView:ProductsOverviewScreen,
ProductDetail:ProductDetailScreen,
Cart:CartScreen,
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS==='android'? Colors.primary:''
        },
        headerTitleStyle:'open-sans-bold',
        headerTintColor:Platform.OS==='android'?'white':"",
        headerBackTitleStyle:{
            fontFamily:'open-sans',
        },
    }
});

export default createAppContainer(ProductsNavigator);