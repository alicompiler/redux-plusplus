import StateForAction from './core/StateForAction';
import Reducer from './core/Reducer';
import StateForActionFromObject from './core/StateForActionFromObject';
import StateForActionFromPayload from './core/StateForActionFromPayload';
import FetchArrayReducer from './reducers/FetchArrayReducer';
import FetchObjectReducer from './reducers/FetchObjectReducer';
import SuccessStateReducer from './reducers/SuccessStateReducer';
import FetchInfiniteArrayReducer from './reducers/FetchInfiniteArrayReducer';
import HttpReducer from './reducers/HttpReducer';
import { HttpMethod } from './utils/HttpMethod';
import { wrapReducer } from './utils/Utils';
import makeAxiosAction from './action/AxiosAction';
import { GETAction, POSTAction, resetAction } from './action/AxiosAction';
import { addItemAtIndex, removeItemAtIndex, addItemToLast, addItemToStart } from './action/FetchArrayAction';

module.exports = {
    Reducer: Reducer,
    StateForAction: StateForAction,
    StateForActionFromObject: StateForActionFromObject,
    StateForActionFromPayload: StateForActionFromPayload,
    FetchArrayReducer: FetchArrayReducer,
    FetchObjectReducer: FetchObjectReducer,
    SuccessStateReducer: SuccessStateReducer,
    FetchInfiniteArrayReducer: FetchInfiniteArrayReducer,
    HttpReducer: HttpReducer,
    HttpMethod: HttpMethod,
    wrapReducer: wrapReducer,
    makeAxiosAction: makeAxiosAction,
    GETAction: GETAction,
    POSTAction: POSTAction,
    resetAction: resetAction,
    addItemAtIndex: addItemAtIndex,
    removeItemAtIndex: removeItemAtIndex,
    addItemToLast: addItemToLast,
    addItemToStart: addItemToStart
};
