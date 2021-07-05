import React from 'react';
import { FlatList,Platform,Button} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/Cart';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
 


const ProductsOverviewScreen=props=>{
    const products=useSelector(state=>state.products.availableProducts);
    const dispatch=useDispatch();
    const selectItem=(id,title)=>{
        props.navigation.navigate('ProductDetail',{
            productId:id,
            productTitle:title,
        })
    };
    return <FlatList 
    data={products} 
    keyExtractor={item=>item.id} 
    renderItem={itemData=><ProductItem 
    image={itemData.item.imageUrl}
    title={itemData.item.title}
    price={itemData.item.price}
    onSelect={()=>{
       selectItem(itemData.item.id,itemData.item.title)
    }}
    >
           <Button
            color={Colors.btn}
            title="View Details"
            onPress={()=>{
                selectItem(itemData.item.id,itemData.item.title)
             }}
          />
          <Button
            color={Colors.btn}
            title="Add to Cart"
            onPress={()=>{
                dispatch(cartActions.addToCart(itemData.item));
            }}
          />
    </ProductItem>}
    />
};

export const screenOptions=navData=>{
    return{
        headerTitle:'All Products',
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                title="Cart"
                iconName={Platform.OS==='android' ? 'md-menu' :'ios-menu'}
                onPress={()=>{
                    navData.navigation.toggleDrawer();
                }}
                />

            </HeaderButtons>
        ),
        headerRight:()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title="Cart"
             iconName={Platform.OS==='android' ? 'md-cart' :'ios-cart'} 
             onPress={()=>{
                navData.navigation.navigate('Cart'); 
            }}/>
        </HeaderButtons>
        )
    };
   
}



export default ProductsOverviewScreen;