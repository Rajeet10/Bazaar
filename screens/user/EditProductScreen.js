import React,{useState,useEffect,useCallback,useReducer} from "react";
import { View, Text, StyleSheet, TextInput, ScrollView,Button,Alert } from "react-native";
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector,useDispatch } from "react-redux";
import * as productsActions from '../../store/actions/Products';

const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE';
const formReducer=(state,action)=>{
  if(action.type===FORM_INPUT_UPDATE){

  }
};


const EditProductScreen = (props) => {
    const prodId=props.route.params ? props.route.params.productId : null;
    const editedProduct=useSelector(state=>
        state.products.userProducts.find(prod=>prod.id===prodId));
        const dispatch=useDispatch();

   const[formState,dispatchFormState] = useReducer(formReducer,{
          inputValues:{
            title:editedProduct ? editedProduct.title :'', 
            imageUrl:editedProduct ? editedProduct.imageUrl :'',
            description:editedProduct ? editedProduct.description :'',
            price:''
          },
          inputValidities:{
            title: editedProduct ? true :false,
            imageUrl: editedProduct ? true :false,
            description: editedProduct ? true :false,
            price: editedProduct ? true :false,
          },
          formIsValid:editedProduct ? true : false
        });

    const submitHandler=useCallback(()=>{
        if(!titleIsValid){
          Alert.alert('Wrong input!','Please check the errors in the form.',[{text:'Okay'}]);
          return;
        }
        if(editedProduct){
            dispatch(productsActions.updateProduct(prodId,title,description,imageUrl));
        }
        else{
            dispatch(productsActions.createProduct(title,description,imageUrl,+price))
        }
        props.navigation.goBack();
    },[dispatch,prodId,title,description,imageUrl,price,titleIsValid]);

    useEffect(()=>{
        props.navigation.setOptions({
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Save"
                  iconName={
                    Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                  }
                  onPress={()=>{submitHandler()}}
                />
              </HeaderButtons>
            )
          });
        }, [submitHandler]);

        const titleChangeHandler=text=>{
          let isValid=false
          if(text.trim().length >0){
            isValid=true;
          }
          dispatchFormState({
            type:FORM_INPUT_UPDATE,
             value:text,
             isValid:isValid,
             input:'title'
            });
        };

    
  return (
    <ScrollView>
    <View style={styles.form}>
    <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={text=>setTitle(text)}
        keyboardType='default'
        autoCapitalize='sentences'
        autoCorrect
        returnKeyType='next'
        onEndEditing={()=>console.log('onEditing')}
        onSubmitEditing={()=>console.log('onSunmitEditing')}
        />
        {!titleIsValid && <Text>Please enter a valid title!</Text>}
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
        onChangeText={text=>setPrice(text)}
        keyboardType='number-pad'
        />
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
    const routeParams = navData.route.params ? navData.route.params : {};
    return{
        headerTitle:routeParams.productId ? 'Edit Product' :'Add Product',
        
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
