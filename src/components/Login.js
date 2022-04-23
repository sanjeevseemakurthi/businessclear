import Dialog from "react-native-dialog";
import { Button ,View,Text,TextInput,StyleSheet,ActivityIndicator} from 'react-native';
import { Overlay } from "react-native-elements";
import { useState } from 'react/cjs/react.development';
import {Authenticateservice} from './Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() { 
  const [visible,setvisible] = useState(true);
  const [email, onChangEmail] = useState("");
  const [pswd, onChangPswd] = useState("");
  const [showspinner,setshowspinner] = useState(false);
  const navigate = new useNavigation();
  async function authenticate(){
    setshowspinner(true);
    payload = {
      username:pswd,
      password:email
    }
    const data =  await Authenticateservice(payload).then((res)=>{
      AsyncStorage.setItem('Token', res.data.jwtToken);
      navigate.navigate('Home');
    }).catch((err)=>{console.log(err)})
  }
  return(
        <View>
          <Button title="opendailog" onPress={()=>{setvisible(true)}}></Button> 
          <Dialog.Container visible={visible}>
             <Dialog.Title>Login</Dialog.Title>
             <Dialog.Description>
             </Dialog.Description>
             <View style={styles.popupview}>
               <Dialog.Input label="User id" 
                   onChangeText={email => onChangEmail(email)}
                   value={email}
                   styles = {styles.input}
                 ></Dialog.Input>
               <Dialog.Input label="paswword" 
                   onChangeText={pswd => onChangPswd(pswd)}
                   value={pswd}
                   styles = {styles.input}
                   secureTextEntry = {true}
                 ></Dialog.Input>
             </View>
             <Dialog.Button label="Cancel" onPress={()=>{
               setvisible(false)
               }}/>
             <Dialog.Button label="Login" onPress={()=>{
               setvisible(false);
               authenticate();
             }} />
           </Dialog.Container> 
         </View>
        );
      }
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      padding: 10,
    },
    popupview:{
      backgroundColor: 'white',
    },
    horizontal: {
      justifyContent: "center",
      alignItems: "center",
      opacity:0.2
    }
  });
      