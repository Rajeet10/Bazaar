import React,{useState} from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productsReducer from './store/reducers/Products';
import ShopNavigator from './navigation/ShopNavigator';
import * as Font from 'expo-font';
import  AppLoading from 'expo-app-loading';
import cartReducer from './store/reducers/Cart';
import ordersReducer from './store/reducers/orders';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';


const rootReducer=combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:ordersReducer,
  auth:authReducer
});
const store=createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if(!fontLoaded){
    return(
      <AppLoading  
      startAsync={fetchFonts}
      onError={(err)=>console.log(err)}
      onFinish={()=>
        setFontLoaded(true)
      }
      />
    );
  
  }
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}

