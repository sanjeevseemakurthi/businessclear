import { createDrawerNavigator,DrawerContentScrollView,
  DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import Accounts from '../components/Accounts';
import Finance from '../components/Finance';
import Home from '../components/Home';
import Analysis from '../components/Analysis';
import PurchaseSales from '../components/PurchaseSales';
import PropertySettings from '../components/PropertySettings';
import Expenses from '../components/Expenses';
import Login from '../components/Login';
import Loginimage from '../StartupServices/LoginContainer'
import {StyleSheet,View,Text} from 'react-native'
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
        <DrawerItem
        label= {()=>{
          return(
            <View>
              <Text style = {styles.alliningcenter}>Business Clear</Text>
            </View>
        )}}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
export default function Routing() {
    return (
        <Drawer.Navigator initialRouteName = "Home" drawerContent={(props) => <CustomDrawerContent {...props}/>}> 
            <Drawer.Screen name="Login" component={Login} 
              options={{
                drawerLabel: () => <Loginimage/>,
                }}
              />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Analysis" component={Analysis} />
            <Drawer.Screen name="PurchaseSales" component={PurchaseSales} />
            <Drawer.Screen name="Accounts" component={Accounts} />
            <Drawer.Screen name="Finance" component={Finance} />
            <Drawer.Screen name="Settings" component={ PropertySettings} />
            <Drawer.Screen name="Expenses" component={Expenses} />
        </Drawer.Navigator>
    );
  }
const styles = StyleSheet.create({
  alliningcenter:{
   textAlign:'center',
   color:"skyblue",
   fontSize:18,
   fontWeight:'900'
  }
})