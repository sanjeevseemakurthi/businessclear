import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
const url = 'http://192.168.2.20:8080/';
axios.interceptors.request.use(
    req=>{
            async function addheader() {
                let headre;
                if(!req.url.includes('authenticate')) {
                    await AsyncStorage.getItem('Token').then(value =>{
                            headre = value
                        });
                    req.headers.Authorization = 'Bearer '+ headre;
                }
                return req;
            }
            return addheader();
        })
export  function ComponentServices() {
    return  axios.get(url + 'test')
}
export function Authenticateservice(payload) {
    return axios.post(url + 'authenticate',payload)
}
export function getperson() {
    return axios.get(url + 'getperson')
}


// for settings
export function settingsdata() {
    return axios.get(url + 'getSettings')
}
export function addsettings(data) {
    return axios.post(url+'addSettingsmultiple',data);
  }
export function updatesettings(data) {
    return axios.post(url+'editSettingsmultiple',data);
  }
export function  deletesettings(data) {
    return axios.post(url+'deleteSettingsmultiple',data);
  }