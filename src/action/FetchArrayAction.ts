import FetchArrayReducer from '../reducers/FetchArrayReducer';
import IAction from '../core/IAction';

export function addItemToStart(type: string, item: any): IAction {
    const actionType = type + '_' + FetchArrayReducer.ADD_ITEM_AT_START_CASE;
    return { type: actionType, payload: item };
}

export function addItemToLast(type: string, item: any): IAction {
    const actionType = type + '_' + FetchArrayReducer.ADD_ITEM_AT_LAST_CASE;
    return { type: actionType, payload: item };
}

export function addItemAtIndex(type: string, index: number, item: any): IAction {
    const actionType = type + '_' + FetchArrayReducer.ADD_ITEM_AT_INDEX;
    return {
        type: actionType,
        payload: {
            index: index,
            item: item
        }
    };
}

export function removeItemAtIndex(type: string, index: number): IAction {
    const actionType = type + '_' + FetchArrayReducer.REMOVE_ITEM_AT_INDEX_CASE;
    return {
        type: actionType,
        payload: index
    };
}
