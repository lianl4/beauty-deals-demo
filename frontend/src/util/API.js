import {API_BASE_URL, ACCESS_TOKEN, MAKEUP_API_URL, MAKEUP_API_BY_ID_URL} from '../Constants';
import axios from 'axios';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}
export function upload(uploadData) {
    return request({
        url: API_BASE_URL + "/products",
        method: 'POST',
        body: JSON.stringify(uploadData)         
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getSearchResult(brand, category) {
    return axios.get(MAKEUP_API_URL(brand, category));
}

export function getProductById(id) {
    return axios.get(MAKEUP_API_BY_ID_URL(id));
}

export function getDeals(id) {
    return axios.get(API_BASE_URL + "/products/descriptions/" + id);
}
export function getFavorite(userId){
    return axios.get(API_BASE_URL + "/users/"+userId+"/favorites" );  
}
export function addFavorite(data,id){
    return request({
        url: API_BASE_URL + "/products/"+id+"/favorite",
        method: 'POST',
        body: JSON.stringify(data)         
    });
}