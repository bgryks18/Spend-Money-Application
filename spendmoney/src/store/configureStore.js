import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import spendReducers from '../reducers/spendReducers'
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
    const store = createStore(
        combineReducers({
        SpendState:spendReducers
    }),
    
    composeEnhancers(applyMiddleware(thunk))
    );
    return store
}