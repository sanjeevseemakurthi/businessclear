import { Text,TextInput,View,StyleSheet,Button,ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import loadshcloneDeep from 'lodash/cloneDeep';
import { useState, useEffect } from "react";
import {settingsdata,addsettings,deletesettings,updatesettings} from './Services';
import { ScreenHeight } from "react-native-elements/dist/helpers";
export default function PropertySettings() {
  let [displaydatastate,setdisplaydata] = useState([]);
  let [settings_datastate,setsettings_data] = useState([]);
  let [actualstored_datastate,setactualstored_data] = useState({});
  let [deletednodesstate,setdeletednodes] = useState([]);
  let [spinnerstate,setspinnerstate] =  useState(false);
  let newnumber = 0;
  let deletednodes = [];
  useEffect(()=>{populatedata()},[]);
  return (
    <View style = {{height:'100%',alignItems:'center'}} >
     { displaydatastate.map((eachpropert,index)=> {
       return (
          <View key={index} style = {styles.flexview}>
            <View style = {{width:'50%',flexDirection:"row"}}>
              <View style = {{width:'80%'}} >
                <TextInput  defaultValue = {eachpropert.name} style ={ styles.inpufield} onChangeText = {(val)=>{onchangeproperty(index,val)}}>
                </TextInput>
              </View>
              <View style = {{width:'20%',margin:10,paddingRight:10}}>
                <Text><Ionicons name='md-remove-circle-outline' size={32} color='black' onPress={()=>{deletepropert(eachpropert,index)}} /></Text>
              </View>
            </View>
            <View  style = {{width:'50%'}}>
            {settings_datastate[eachpropert.name] && settings_datastate[eachpropert.name].map((subproperty,subindex)=>{
                return (
                  <View key={subindex} style = {{flexDirection:"row"}}>
                    <View style = {{width:'80%'}} >
                      <TextInput defaultValue= {subproperty.name} style ={ styles.inpufield} onChangeText ={(data)=>onsubpropchange(eachpropert.name,subindex,data)}>
                      </TextInput>
                    </View>
                    <View style = {{width:'20%',margin:10,paddingRight:10}}>
                    <Text><Ionicons name='md-remove-circle-outline' size={32} color='black'  onPress={()=>{deletesubproperty(eachpropert.name,subindex)}}  /></Text>
                    </View>
                  </View>
                )})}
            <View style={{width:50, paddingRight :10}}>
            <Text><Ionicons name='md-add-circle-outline' size={32} color='black'  onPress={()=>{addsubproperty(eachpropert.name)}} /></Text>
            </View>
            </View>
          </View>
       )})}
       <View style = {{flexDirection : "row",width:'80%',bottom:10 ,position:'absolute',alignContent:'center',justifyContent:"space-between"}} >
         <View style={{ margin:10,padding:10,zIndex:1}} ><Button title="add new" onPress={()=>{addproperty()}}/></View>
         <View  style={{ margin:10,padding:10,zIndex:1}}  ><Button title="Submit" onPress={()=>{submitdata()}}/></View>
         <View  style={{ margin:10,padding:10,zIndex:1}}  ><Button title="Reset" onPress={()=>{reset()}}/></View>
       </View>
      <View style={{position:"absolute" ,height:'100%',width:'100%'}}>
                  {spinnerstate && <View style = {{ height:'100%',width:'100%',backgroundColor:'gray', alignItems: 'center', justifyContent: 'center',zIndex:2}}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>}
      </View>
    </View>
  );
  function onsubpropchange(property,subpropertyindex,val) {
    let data =settings_datastate;
    data[property][subpropertyindex]['name'] = val;
    setsettings_data({...data});
  }
  function onchangeproperty(index,value){
    let data = displaydatastate;
    data[index].value = value;
    setdisplaydata([...data]);
  }
  async function populatedata() {
      setspinnerstate(true);
      await settingsdata().then((res)=>{
       
        let actualstored_data = res.data;
        setactualstored_data(loadshcloneDeep(actualstored_data));
        const displaydata = Object.keys(res.data).map(data=>{
          return {"name":data,"value":data}
        });
        setsettings_data(loadshcloneDeep({...res.data}));
        setdisplaydata([...displaydata]);
        setdeletednodes([]);
        setspinnerstate(false);
    }).catch(er=>{
      console.log(er)
    });
  }
  function addproperty() {
    let displaydata = displaydatastate;
    let settings_data = settings_datastate;
    newnumber = newnumber + 1;
    const datatest = 'newproperty'+'__' + newnumber;
    displaydata.push({"name":datatest,"value":''})
    settings_data[datatest] = [{'name':'',id:''}]
    setsettings_data({...settings_data});
    setdisplaydata([...displaydata]);
  }
  function addsubproperty(property) {
    let displaydata = displaydatastate;
    let settings_data = settings_datastate;
    newnumber = newnumber + 1;
    settings_data[property].push([{'name':'',id:''}]);
    setsettings_data({...settings_data});
  }

  function reset() {
    populatedata();
  }
  function deletepropert(property,index) {
    let displaydata = displaydatastate;
    let settings_data = settings_datastate;
    let deletednodes = deletednodesstate;
    displaydata.splice(index,1)
    let data = settings_data[property.name]; 
    data.forEach((subproperty,indexofdata) => {
      if(settings_data[property.name][indexofdata].id !== '') {
        let datatodelete = {
          property : property.name,
          subproperty : settings_data[property.name][indexofdata].name,
          id:settings_data[property.name][indexofdata].id
        }
      deletednodes.push(datatodelete);
      setdeletednodes([...deletednodes]);
      }
    });
    delete settings_data[property.name];
    setsettings_data({...settings_data});
    setdisplaydata([...displaydata]);
  } 
  function deletesubproperty(propert,index) {
    let displaydata = displaydatastate;
    let settings_data = settings_datastate;
    if(settings_data[propert][index].id !== '') {
      let datatodelete = {
        property : propert,
        subproperty : settings_data[propert][index].name,
        id:settings_data[propert][index].id
      }
    deletednodes.push(datatodelete);
    }
    settings_data[propert].splice(index,1);
    setsettings_data({...settings_data});
    setdisplaydata([...displaydata]);
    setdeletednodes([...deletednodes]);
  }
  async function submitdata() {
    let newNodes = [];
    let updatenodes = [];
    let displaydata = displaydatastate;
    let settings_data = settings_datastate;
    let actualstored_data = actualstored_datastate;
    let deletednodes = deletednodesstate;
    displaydata.forEach(property => {
      settings_data[property.name].forEach(subpropert => { 
        const data = {
          property : property.value,
          subproperty: subpropert.name,
          id : subpropert.id
        }
        if(!data.id) {
          newNodes.push(data)
        } else {
          let flag = true;
          if(actualstored_data[data.property]){
            let res = actualstored_data[data.property].findIndex(element =>{
              if(element.name === data.subproperty && element.id === data.id) {
                return true
              }
            })
            if(res !== -1){
              flag = false;
            }
          } 
          if(flag) {
            updatenodes.push(data);
          }
        }
      });
    });
    let payloads =[];
   if(newNodes.length !== 0) {
    payloads.push(addsettings(newNodes));
   }
   if(updatenodes.length !== 0) {
    payloads.push( updatesettings(updatenodes));
   }
   if(deletednodes.length !==0){
    payloads.push( deletesettings(deletednodes));
   }
   await Promise.all(payloads).then((res ,index) => {
      populatedata();
   }).catch((err)=>{
     console.log(err);
   })
  }
}
const styles = StyleSheet.create({
  flexview:{
    flexDirection:"row",
    padding:10,
    width:'100%'
  },
  flexviewchildone:{
    width:'50%',
  },
  flexviewchildtwo:{
    width:'50%',
  },
  flexviewcolumn:{
    flexDirection:"column",
  },
  inpufield:{
    borderWidth:1,
    backgroundColor:'white',
    margin:10,
    paddingLeft:10,
  },
  icon:{
    borderRadius:40,
    marginTop:10
  },
  footer: {
    bottom: 0
  }
});