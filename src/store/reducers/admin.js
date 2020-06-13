/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import { GET_ADMIN_VOLUNTEERS_LOADING, GET_ADMIN_REQUESTS_FAILED, SET_ADMIN_VOLUNTEERS, GET_ADMIN_USERS_LOADING, GET_ADMIN_VOLUNTEERS_FAILED, GET_ADMIN_USERS_FAILED, SET_ADMIN_USERS, GET_ADMIN_REQUESTS_LOADING, SET_ADMIN_REQUESTS } from "../actions/actionTypes";

export const adminReducer=(state={
    
   requests:[],
   users:[],
   volunteers:[],
    
    isLoading: false,
    errMess: null,


},action)=>{
    switch (action.type){
        case GET_ADMIN_VOLUNTEERS_LOADING:
            return {...state, isLoading: true, errMess: null, volunteers:[]};
        case GET_ADMIN_VOLUNTEERS_FAILED:
            return {...state,isLoading:false,errMess:action.message,volunteers:[]}    
        case SET_ADMIN_VOLUNTEERS:
            return {...state,isLoading:false,errMess:null,volunteers:action.payload};
        
        case GET_ADMIN_USERS_LOADING:
            return {...state, isLoading: true, errMess: null, users:[]};
        case GET_ADMIN_USERS_FAILED:
            return {...state,isLoading:false,errMess:action.message,volunteers:[]}
        case SET_ADMIN_USERS:
            return {...state,isLoading:false,errMess:null,users:action.payload};

        case GET_ADMIN_REQUESTS_LOADING:
            return {...state,isLoading:true,errMess:null,requests:[]};
        case GET_ADMIN_REQUESTS_FAILED:
            return {...state,isLoading:false,errMess:action.message,requests:[]};
        case SET_ADMIN_REQUESTS:
            return {...state,isLoading:false,errMess:null,requests:action.payload};
        

        
            default: return state;
       
    }
    
}