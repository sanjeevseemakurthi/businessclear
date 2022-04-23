
import { StyleSheet,Text,Image } from "react-native";
import { View } from "react-native";
export default function Loginimage(){
    return(
      <View style = {styles.parent}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/sanju-profile-pic.jpg')}
        />
      </View>
    )}
const styles = StyleSheet.create({
  tinyLogo: {
    width:100,
    height:100,
    borderRadius:100,
    alignItems: 'center',
    justifyContent:"center",
  },
  parent:{
    alignItems: 'center',
    justifyContent:"center",
  }

});