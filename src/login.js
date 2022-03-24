import React, { useState ,useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {Mutation} from 'react-apollo';
import {gql} from '@apollo/client';
import { Actions } from 'react-native-router-flux';

export default function Login() {

  
const FETCH_LOGIN = gql`
  mutation Fetch_Login($email: String!) {
    loginUser(email: $email) {
        _id
        name
        email
    }
  }
`;

const [email, setEmail] = useState("");
let inputText = useRef(null);


return (
<View style={styles.container}>
  <Mutation mutation={FETCH_LOGIN} variables={{ email:email }}>{(loginUser, { loading, error, data }) => (
    <View style={{width:"100%",alignItems:"center"}}>
      <View style={styles.inputView}>
        <TextInput
         ref={el => inputText = el}
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
          clearButtonMode="always" 
        />
      </View>
 
      <TouchableOpacity  onPress={() => {Actions.CreateUser()}}>
        <Text style={styles.forgot_button}>Create User </Text>
      </TouchableOpacity>
 
     {loading ? <Text>Loading...</Text> : <TouchableOpacity style={styles.loginBtn} onPress = {loginUser}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>}
      {error && <Text>{"Error :( Please try again"+error} </Text>}      
       {data === undefined ? <View></View>:data.loginUser != null ?(
            data = undefined,
            inputText.current = "",
            setEmail(""),
            Actions.ListUser()
         ): 
         <Text style={{color:"red",marginTop:"5%"}}>{"User Name and Password Erro"}</Text>}
      </View>
      )}

    </Mutation>
 </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#FF1493",
  },
});