/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import { GET_ADMIN_REQUESTS_LOADING, SET_ADMIN_REQUESTS, GET_ADMIN_REQUESTS_FAILED, GET_ADMIN_USERS_FAILED, GET_ADMIN_USERS_LOADING, SET_ADMIN_USERS, GET_ADMIN_VOLUNTEERS_FAILED, GET_ADMIN_VOLUNTEERS_LOADING, SET_ADMIN_VOLUNTEERS } from "./actionTypes";
import { baseUrl } from './baseUrl'
export const adm_get_requests=(token)=>{
    return async dispatch=>{
   
        dispatch(requestsStart());
        const bearer = 'Bearer ' + token;

        return fetch(baseUrl + 'admin/requests',
        {
            method: 'GET',
            
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(payload =>   dispatch(set_requests(payload)))
        .catch(error =>    dispatch(requestsError(error.message)))
    }

}

export const requestsError=(message)=>{
    return{
        type:GET_ADMIN_REQUESTS_FAILED,
        message
    }
}

export const requestsStart=()=>{
    return {
        type:GET_ADMIN_REQUESTS_LOADING
    }
}

export const set_requests=(payload)=>{
    return {
        type:SET_ADMIN_REQUESTS,
        payload
    }
}


export const adm_get_users=(token)=>{
    return async dispatch=>{
   
        dispatch(usersStart());
        const bearer = 'Bearer ' + token;

        return fetch(baseUrl + 'admin/users',
        {
            method: 'GET',
            
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(payload =>   dispatch(set_users(payload)))
        .catch(error =>    dispatch(usersError(error.message)))
    }

}

export const usersError=(message)=>{
    return{
        type:GET_ADMIN_USERS_FAILED,
        message
    }
}

export const usersStart=()=>{
    return {
        type:GET_ADMIN_USERS_LOADING
    }
}

export const set_users=(payload)=>{
    return {
        type:SET_ADMIN_USERS,
        payload
    }
}


export const adm_get_volunteers=(token)=>{
    return async dispatch=>{
   
        dispatch(volunteersStart());
        const bearer = 'Bearer ' + token;

        return fetch(baseUrl + 'admin/volunteers',
        {
            method: 'GET',
            
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(payload =>   dispatch(set_volunteers(payload)))
        .catch(error =>    dispatch(volunteersError(error.message)))
    }

}

export const volunteersError=(message)=>{
    return{
        type:GET_ADMIN_VOLUNTEERS_FAILED,
        message
    }
}

export const volunteersStart=()=>{
    return {
        type:GET_ADMIN_VOLUNTEERS_LOADING,
    }
}

export const set_volunteers=(payload)=>{
    return {
        type:SET_ADMIN_VOLUNTEERS,
        payload
    }
}


