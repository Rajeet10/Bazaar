import React,{useState,useEffect,useCallback} from "react";
import { View, Text, StyleSheet, TextInput, ScrollView,Button } from "react-native";
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector } from "react-redux";

const EditProductScreen = (props) => {
    const prodId=props.route.params ? props.route.params.productId : null;
    const editedProduct=useSelector(state=>
        state.products.userProducts.find(prod=>prod.id===prodId));

    const [title, setTitle] = useState(editedProduct?editedProduct.title:'');
    const [imageUrl, setImageUrl] = useState(editedProduct?editedProduct.imageUrl:'');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct?editedProduct.description:'');
    // const submitHandler=useCallback(()=>{
    //     console.log('submitting');
    // },[]);
    // useEffect(()=>{
    //     props.navigation.setParams({submit:submitHandler});
    // },[submitHandler])
    
  return (
    <ScrollView>
    <View style={styles.form}>
    <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={text=>setTitle(text)}/>
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Image Url</Text>
        <TextInput 
        style={styles.input} 
        value={imageUrl} 
        onChangeText={text=>setImageUrl(text)}
        />
      </View>
     {
     editedProduct ? null: <View style={styles.formControl}>
        <Text style={styles.label}>Price</Text>
        <TextInput 
        style={styles.input} 
        value={price} 
        onChangeText={text=>setPrice(text)}/>
      </View>
      }
      <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input}
        value={description} 
        onChangeText={text=>setDescription(text)}/>
      </View>
    </View>     
    </ScrollView>
  );
};
export const screenOptions=navData=>{
    // const submitFn=navData.route.params.submit;
    return{
        headerTitle:navData.route.params.productId ? 'Edit Product' :'Add Product',
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
                Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onPress={()=>{}}
          />
        </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form:{
        margin:20
    },
    formControl:{
        width:'100%',
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
});

export default EditProductScreen;
