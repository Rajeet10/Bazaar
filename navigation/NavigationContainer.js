import React,{useEffect,useRef} from 'react';
import ShopNavigator from './ShopNavigator';
import { useSelector } from 'react-redux';
import { NavigationAction } from '@react-navigation/routers';

const NavigationContainer =props=>{
    const navRef=useRef();
    const isAuth=useSelector(state=>!!state.auth.token);
    useEffect(()=>{
        if(!isAuth){
            navRef.current.dispatch();
            NavigationAction.navigate({routeName:'Auth'})
        }
    },[isAuth]);

return <ShopNavigator ref={navRef}/>
};

export default NavigationContainer;
