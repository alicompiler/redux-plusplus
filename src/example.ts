import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import Reducer from './core/Reducer';
import StateForActionFromObject from './core/StateForActionFromObject';
import { wrapReducer } from './utils/Utils';
import StateForActionFromPayload from './core/StateForActionFromPayload';
import { GETAction } from './action/AxiosAction';
import FetchInfiniteArrayReducer from './reducers/FetchInfiniteArrayReducer';
import * as ArrayActions from './action/FetchArrayAction';
import FetchObjectReducer from './reducers/FetchObjectReducer';
import SuccessStateReducer from './reducers/SuccessStateReducer';
const middleware = applyMiddleware(promiseMiddleware);

const OpenCloseReducer = new Reducer({ open: false }, [
    new StateForActionFromObject('OPEN', null, { open: true }),
    new StateForActionFromObject('CLOSE', null, { open: false })
]);

const CounterReducer = new Reducer({ value: 0 }, [
    new StateForActionFromPayload('INCREASE', null, (payload: any, currentState: object) => {
        const newValue = currentState['value'] + 1;
        return { value: newValue };
    }),
    new StateForActionFromPayload('DECREASE', null, (payload: any, currentState: object) => {
        const newValue = currentState['value'] - 1;
        return { value: newValue };
    })
]);

const reducers = {
    OpenCloseReducer: wrapReducer(OpenCloseReducer),
    CounterReducer: wrapReducer(CounterReducer),
    Array: wrapReducer(new FetchInfiniteArrayReducer('ARRAY')),
    Object: wrapReducer(new FetchObjectReducer('OBJECT')),
    Success: wrapReducer(new SuccessStateReducer('SUCCESS-STATE'))
};

const store = createStore(combineReducers(reducers as any), middleware);
store.subscribe(() => {
    console.log('store changed', store.getState());
    refresh();
});
const dispatch = store.dispatch;

const openButton: any = document.getElementById('open-button');
openButton.onclick = function open() {
    dispatch({ type: 'OPEN' });
};
const closeButton: any = document.getElementById('close-button');
closeButton.onclick = function close() {
    dispatch({ type: 'CLOSE' });
};

const increaseButton: any = document.getElementById('increase-button');
increaseButton.onclick = function() {
    dispatch({ type: 'INCREASE' });
};

const decreaseButton: any = document.getElementById('decrease-button');
decreaseButton.onclick = function() {
    dispatch({ type: 'DECREASE' });
};

const fetchArrayButton: any = document.getElementById('fetch-array-button');
fetchArrayButton.onclick = function() {
    const action = GETAction('ARRAY', 'https://api.myjson.com/bins/bplo6');
    dispatch(action);
};

const addItemAsStartButton: any = document.getElementById('add-item-at-start');
addItemAsStartButton.onclick = function() {
    const action = ArrayActions.addItemToStart('ARRAY', 'NEW ADDED ITEM');
    dispatch(action);
};

const addItemAsLastButton: any = document.getElementById('add-item-at-last');
addItemAsLastButton.onclick = function() {
    const action = ArrayActions.addItemToLast('ARRAY', 'NEW ADDED ITEM');
    dispatch(action);
};

const addItemAsIndexButton: any = document.getElementById('add-item-at-index');
addItemAsIndexButton.onclick = function() {
    const indexElement: any = document.getElementById('index');
    if (indexElement.value == '' || indexElement.value < 0) {
        return;
    }
    const index = indexElement.value;
    const action = ArrayActions.addItemAtIndex('ARRAY', index, 'NEW ADDED ITEM');
    dispatch(action);
};

const fetchObjectButton: any = document.getElementById('object-button');
fetchObjectButton.onclick = function() {
    const action = GETAction('OBJECT', 'https://api.myjson.com/bins/jidp2');
    dispatch(action);
};

const successStateButton: any = document.getElementById('success-state-button');
successStateButton.onclick = function() {
    const action = GETAction('SUCCESS-STATE', 'https://api.myjson.com/bins/18il3q');
    dispatch(action);
};

function refresh() {
    const openState = store.getState()['OpenCloseReducer'].open;
    const openCloseReducerElement: any = document.getElementById('open-close-reducer');
    openCloseReducerElement.innerText = String(openState);
    const counterValue = store.getState()['CounterReducer'].value;
    const counterReducer: any = document.getElementById('counter-reducer');
    counterReducer.innerText = counterValue;

    const arrayState = store.getState()['Array'];
    const loading = arrayState.loading;
    const fetchArrayButton: any = document.getElementById('fetch-array-button');
    const arrayReducerState: any = document.getElementById('array-reducer-state');
    fetchArrayButton.disabled = loading || (arrayState.array && arrayState.array.length > 0);
    const error = arrayState.error;
    if (error) {
        arrayReducerState.innerText = 'An error happened';
    } else if (loading) {
        arrayReducerState.innerText = 'Loading...';
    } else {
        arrayReducerState.innerText = '';
    }

    arrayUI(arrayState);

    const objectState = store.getState()['Object'];
    const objectReducerState: any = document.getElementById('object-reducer-state');
    fetchObjectButton.disabled = objectState.loading;
    const errorForObject = objectState.error;
    if (errorForObject) {
        objectReducerState.innerText = 'An error happened';
    } else if (objectState.loading) {
        objectReducerState.innerText = 'Loading...';
    } else {
        objectReducerState.innerText = '';
    }

    const objectElement: any = document.getElementById('object');
    objectElement.innerText = JSON.stringify(objectState.object);

    const successState: any = document.getElementById('success-state');
    const successMessage: any = document.getElementById('success-message');
    const successReducerState: any = document.getElementById('success-reducer-state');
    const success = store.getState()['Success'];
    if (success.loading) {
        successReducerState.innerText = 'Loading...';
    } else if (success.error) {
        successReducerState.innerText = 'Error...';
    } else {
        successReducerState.innerText = '';
        successState.innerText = success.success;
        successMessage.innerText = success.message;
    }

    const logElement: any = document.getElementById('log');
    logElement.innerHTML = `<p>${JSON.stringify(store.getState(), undefined, 2)}</p>`;
}

const logElement: any = document.getElementById('log');
logElement.innerHTML = `<p>${JSON.stringify(store.getState(), undefined, 2)}</p>`;

if ((module as any).hot) {
    (module as any).hot.accept();
}

function arrayUI(arrayState: any) {
    const ul: any = document.getElementById('array');
    ul.innerHTML = '';
    const array = arrayState.array;
    if (array) {
        array.forEach((item: any, index: number) => {
            const liElement = document.createElement('li');
            liElement.innerHTML = `<b>${item}</b><button data-index="${index}" class="remove-button">REMOVE</button>`;
            ul.append(liElement);
        });
        const liElement = document.createElement('li');
        liElement.innerHTML = `<button id="load-more-button">LOAD MORE</button>`;
        ul.append(liElement);
        const loadMoreButton: any = document.getElementById('load-more-button');
        loadMoreButton.onclick = function() {
            const action = GETAction('ARRAY', 'https://api.myjson.com/bins/iwy3a');
            dispatch(action);
        };
        addRemoveButtonOnClickListener();
    }
}

function addRemoveButtonOnClickListener() {
    const buttons = document.getElementsByClassName('remove-button');
    for (let i = 0; i < buttons.length; i++) {
        const button: any = buttons.item(i);
        button.onclick = removeAtIndex;
    }
}

function removeAtIndex(e: any) {
    const element = e.target;
    const index = element.getAttribute('data-index');
    const action = ArrayActions.removeItemAtIndex('ARRAY', index);
    dispatch(action);
}
//https://api.myjson.com/bins/bplo6
//https://api.myjson.com/bins/iwy3a
//https://api.myjson.com/bins/jidp2
//https://api.myjson.com/bins/18il3q
