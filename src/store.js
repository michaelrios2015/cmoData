import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_DATA = 'LOAD_DATA';


//segment of real data ************************
const dataReducer = (state = [], action) =>{
    if (action.type === LOAD_DATA){
        state = action.data
    }

    return state;
}


// the reducer
const reducer = combineReducers({
    data: dataReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


//TESTS THUNKS****************************************


const _loadData = (data) =>{
    return {
        type: LOAD_DATA,
        data
    };
};

const loadData = () =>{
    return async(dispatch)=>{
        // console.log('---------------in loadDataByGroup dispath ----------');
        const data = (await axios.get('/api/cmos')).data;
        // console.log(data);
        dispatch(_loadData(data));
    }
};

const loadDataByDealandGroup = (deal, group) =>{
    
    return async(dispatch)=>{
        console.log('---------------in loadDataByGroup dispath ----------');
        const data = (await axios.get(`/api/dealandgroup/${deal}/${group}`)).data;
        console.log(data);
        dispatch(_loadData(data));
    }
};

export default store;
export { loadData, loadDataByDealandGroup };