import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import Reducer from './core/Reducer';
import StateForActionFromObject from './core/StateForActionFromObject';
import { wrapReducer } from './utils/Utils';
import StateForActionFromPayload from './core/StateForActionFromPayload';
import { POSTAction } from './action/AxiosAction';
import FetchInfiniteArrayReducer from './reducers/FetchInfiniteArrayReducer';
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
    Array: wrapReducer(new FetchInfiniteArrayReducer('ARRAY'))
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
    const action = POSTAction('ARRAY', 'https://api.myjson.com/bins/bplo6');
    dispatch(action);
    fetchArrayButton.disabled = true;
};

function refresh() {
    const openState = store.getState()['OpenCloseReducer'].open;
    const openCloseReducerElement: any = document.getElementById('open-close-reducer');
    openCloseReducerElement.innerText = String(openState);
    const counterValue = store.getState()['CounterReducer'].value;
    const counterReducer: any = document.getElementById('counter-reducer');
    counterReducer.innerText = counterValue;
}

if ((module as any).hot) {
    (module as any).hot.accept();
}

//https://api.myjson.com/bins/bplo6
//https://api.myjson.com/bins/iwy3a
//https://api.myjson.com/bins/jidp2
//https://api.myjson.com/bins/18il3q
