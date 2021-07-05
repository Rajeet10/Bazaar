import React from 'react';
import {FlatList,Button,Platform} from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector } from 'react-redux';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const UserProductsScreen = props=>{
    const userProducts = useSelector(state => state.products.userProducts);
    return(
        <FlatList
        data={userProducts}
        keyExtractor={item=>item.id}
        renderItem={itemData=>(
        <ProductItem 
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={()=>{}}
        > 
            <Button
            color={Colors.btn}
            title="Edit"
            onPress={()=>{
               
             }}
          />
          <Button
            color={Colors.btn}
            title="Delete"
            onPress={()=>{
                
            }}
          />
      
       </ProductItem>)}
        />
    );
   
};


export const screenOptions = navData => {
    return {
      headerTitle: 'Your Products',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    //   headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="Add"
    //         iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
    //         onPress={() => {
    //           navData.navigation.navigate('EditProduct');
    //         }}
    //       />
    //     </HeaderButtons>
    //   )
    };
  };
export default UserProductsScreen
