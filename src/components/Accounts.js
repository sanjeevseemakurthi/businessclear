import { Text,View,Button } from "react-native";
import {getperson} from './Services'
import { useState } from 'react/cjs/react.development';
export default function Accounts() {
  const [peopledata,setpeople] = useState([]);
  async function persondata(){
    await getperson().then((res)=>{
        console.log(res.data)
      }).catch(er=>{
        console.log(er)
      });
  }
  return (
    <View>
      <Text>
          Accounts works
          <Button title="getpeopledata" onPress={()=>{persondata()}}></Button>
      </Text>
    </View>
  );
  }