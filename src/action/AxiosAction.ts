import Axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { HttpMethod } from './../utils/HttpMethod';
import IAction from '../core/IAction';
import HttpReducer from '../reducers/HttpReducer';

export default function makeAxiosAction(
    type: string,
    url: string,
    method: HttpMethod,
    data: object = {},
    options: AxiosRequestConfig = {}
): IAction {
    return {
        type: type,
        payload: getHttpRequest(url, method, data, options)
    };
}

function getHttpRequest(url: string, method: HttpMethod, data: any = {}, options: any = {}): AxiosPromise {
    if (method === HttpMethod.POST) {
        return Axios.post(url, data, options);
    }
    return Axios.get(url, options);
}

export function POSTAction(type: string, url: string, data: object = {}, options: AxiosRequestConfig = {}): IAction {
    return makeAxiosAction(type, url, HttpMethod.POST, data, options);
}

export function GETAction(type: string, url: string, data: object = {}, options: AxiosRequestConfig = {}): IAction {
    options.params = data;
    return makeAxiosAction(type, url, HttpMethod.GET, data, options);
}

export function resetAction(type: string): IAction {
    return {
        type: type + '_' + HttpReducer.RESET,
        payload: null
    };
}
