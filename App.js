import React,{useState} from 'react';
import {  Text, View } from 'react-native';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import productsReducer from './store/reducers/Products';
import ShopNavigator from './navigation/ShopNavigator';
import * as Font from 'expo-font';
import  AppLoading from 'expo-app-loading';



const rootReducer=combineReducers({
  products:productsReducer,
});
const store=createStore(rootReducer);

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
      <ShopNavigator></ShopNavigator>
    </Provider>
  );
}

