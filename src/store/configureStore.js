import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/*
 * Copyright (c) Yurii Yevdokimov
 * Released under the CC BY-NC-SA 4.0
 */
import {authReducer} from "./reducers/auth";

import {geoReducer} from "./reducers/geo";
import {requestsReducer} from "./reducers/requests";
import {adminReducer} from "./reducers/admin"
 const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            
            auth: authReducer,
            
            geo: geoReducer,
            requests:requestsReducer,
            admin:adminReducer,
            
        }),
        applyMiddleware(thunk, )
    );

    return store;
}
export default ConfigureStore;