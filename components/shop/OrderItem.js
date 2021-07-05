import React from 'react';
import {Text,View,StyleSheet,Button} from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = (props)=>{
    return(
        <View style={styles.orderItem}> 
            <View style={styles.summary}>
                <Text style={styles.totalamount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title="show details" color={Colors.primary}></Button>
        </View>
    );
};

const styles=StyleSheet.create({
orderItem:{
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin:20,
    padding:10,
    alignItems:'center'
},
summary:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    marginBottom:15
},
totalamount:{
    fontFamily:'open-sans-bold',
    fontSize:16,

},
date:{
    fontSize:16,
    fontFamily:'open-sans',
    color:'#888'
}
});


export default OrderItem;
