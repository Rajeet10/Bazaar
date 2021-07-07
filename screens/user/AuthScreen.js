import React from 'react';
import {View,ScrollView,KeyboardAvoidingView,StyleSheet,Button,} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const AuthScreen = props=>{
    return(
        <KeyboardAvoidingView 
        behavior='padding'
        keyboardVerticalOffset={50}
        style={styles.screen}
        >
            <LinearGradient 
            colors={['#ffedff', '#ffe3ff']} 
            style={styles.gradient}>
        <Card style={styles.authContainer}>
            <ScrollView>
                <Input 
                id="email"
                label="E-Mail"
                keyboardType='email-address'
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address"
                onValueChange={()=>{}}
                initialValue=""
                />
                <Input 
                id="password"
                label="Password"
                keyboardType='default'
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password"
                onInputChange={()=>{}}
                initialValue=""
                />
                <View style={styles.buttonContainer}> 
                <Button 
                title="Login" 
                color={Colors.primary} 
                onPress={()=>{}}
                />
                </View>
                <View style={styles.buttonContainer}>
                   <Button 
                title="Switch to Sign Up" 
                color={Colors.accent} 
                onPress={()=>{}}
                />
                </View>
            </ScrollView>

        </Card>
        </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export const screenOptions = {
    headerTitle: 'Authenticate'
  };


const styles=StyleSheet.create({
screen:{
    flex:1,
},
gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
authContainer:{
    width:'80%',
    maxWidth:400,
    maxHeight:400,
    padding:20,
},
buttonContainer:{
    marginTop:10
}

});

export default AuthScreen;
