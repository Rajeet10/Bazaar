import React,{useState} from "react";
import { View, Text, FlatList, StyleSheet, Button,ActivityIndicator } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/Cart';
import * as ordersActions from '../../store/actions/order';
import Card from "../../components/UI/Card";


const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems=useSelector(state=>{
      const transformedItems=[];
      for (const key in state.cart.items){
          transformedItems.push({
            productId:key,
            productTitle:state.cart.items[key].productTitle,
            productPrice:state.cart.items[key].productPrice,
            quantity:state.cart.items[key].quantity,
            sum:state.cart.items[key].sum
          });
      }
      return transformedItems.sort((a,b)=>
      a.productId>b.productId ? 1:-1
      );
  });
  const dispatch=useDispatch();
  const sendOrderHandler=async()=>{
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems,cartTotalAmount));
    setIsLoading(false);
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>Total:
        <Text style={styles.amount }>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
        </Text>
        {isLoading ? <ActivityIndicator
        size="small" color={Colors.primary}/>
        :
        <Button 
        color={Colors.accent} 
        title="Order Now"  
        disabled={cartItems.length===0}
        onPress={sendOrderHandler}
        />
        }
    
      </Card>
      <FlatList 
      data={cartItems}
      keyExtractor={item=>item.productId}
      renderItem={itemData=><CartItem 
      quantity={itemData.item.quantity}
      title={itemData.item.productTitle}
      amount={itemData.item.sum}
      deletable
      onRemove={()=>{
        dispatch(cartActions.removefromCart(itemData.item.productId));
      }}
      />}
        />
    </View>
  );
};

export const screenOptions={
  headerTitle:'Your Cart'
};

const styles = StyleSheet.create({
    screen:{
        margin:20,

    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        margin:20,
        padding:10,
        
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18,
    },
    amount:{
        color:Colors.primary,
    },
});

export default CartScreen;
