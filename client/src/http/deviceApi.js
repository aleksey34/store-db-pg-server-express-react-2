import { $authHost , $host } from ".";
import {jwtDecode} from "jwt-decode";

export const createType = async (type)=>{

    try {

        const {data} = 
        await $authHost.post('api/type', type );
         return data; 

    } catch (error) {
         return error.response.data.message;
    }


}

export const fetchTypes = async ()=>{
   
    try {
         const {data} = 
        await $host.get('api/type');
       
         return data;
    } catch (error) {
       return error.response.data.message;
    }
 

}



export const createBrand = async (brand)=>{

    try {

        const {data} = 
        await $authHost.post('api/brand', brand );
         return data; 

    } catch (error) {
         return error.response.data.message;
    }


}

export const fetchBrands = async ()=>{
   
    try {
         const {data} = 
        await $host.get('api/brand');
       
         return data;
    } catch (error) {
       return error.response.data.message;
    }
 

}

export const createDevice = async (device)=>{

    try {

        const {data} = 
        await $authHost.post('api/device', device );
         return data; 

    } catch (error) {
         return error.response.data.message;
    }


}

export const fetchDevices = async (typeId , brandId , page , limit=5)=>{
   
    try {
         const {data} = 
        await $host.get('api/device' , {params:{typeId , brandId , page , limit}});
       
         return data;
    } catch (error) {
       return error.response.data.message;
    }
 

}

export const fetchOneDevice = async (id)=>{
   
    try {
         const {data} = 
        await $host.get(`api/device/${id}`);
       
         return data;
    } catch (error) {
       return error.response.data.message;
    }
 

}