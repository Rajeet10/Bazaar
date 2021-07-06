import React,{useState,useEffect,useCallback,useReducer} from "react";
import { View, Text, StyleSheet, TextInput, ScrollView,Button,Alert } from "react-native";
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector,useDispatch } from "react-redux";
import * as productsActions from '../../store/actions/Products';
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE';
const formReducer=(state,action)=>{
  if(action.type===FORM_INPUT_UPDATE){
    const updatedvalues={
      ...state.inputValues,
      [action.input]:action.value
    };
    const updatedValidities={
      ...state.inputValidities,
      [action.input]:action.isValid
    };
    let updatedFormIsValid=true;
    for(const key in updatedValidities){
      updatedFormIsValid=updatedFormIsValid && updatedValidities[key];
    }
    return{
      formIsValid:updatedFormIsValid,
      inputValidities:updatedValidities,
      inputValues:updatedvalues,
      
    }; 
  }
  return state;
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
        if( !formState.formIsValid ){
          Alert.alert('Wrong input!','Please check the errors in the form.',[{text:'Okay'}]);
          return;
        }
        if(editedProduct){
            dispatch(productsActions.updateProduct(
              prodId,
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl
              ));
        }
        else{
            dispatch(productsActions.createProduct(
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              +formState.inputValues.price
              ));
        }
        props.navigation.goBack();
    },[dispatch,prodId,formState]);

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

        const textChangeChangeHandler=(inputIdentifier,text)=>{
          let isValid=false
          if(text.trim().length >0){
            isValid=true;
          }
          dispatchFormState({
            type:FORM_INPUT_UPDATE,
             value:text,
             isValid:isValid,
             input:inputIdentifier
            });
        };

    
  return (
    <ScrollView>
    <View style={styles.form}>
    <Input 
    label='Title'
    errorText='Please enter a valid title!'
     keyboardType='default'
     autoCapitalize='sentences'
     autoCorrect
     returnKeyType='next'
     />
       <Input 
    label='Image Url'
    errorText='Please enter a valid imageUrl!'
     keyboardType='default'
     returnKeyType='next'
     />
     {
     editedProduct ? null:( 
       <Input 
    label='Price'
    errorText='Please enter a valid price!'
     keyboardType='decimal-pad'
     returnKeyType='next'
     />
      
     )}
   <Input 
    label='Description'
    errorText='Please enter a valid description!'
     keyboardType='default'
     autoCapitalize='sentences'
     autoCorrect
     multiline
     numberOfLines={3}
     />
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
    
});

export default EditProductScreen;
