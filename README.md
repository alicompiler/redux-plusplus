###### reduxpp is library that help you with making new reducers and also help you making actions


#
#
#
#
#
## Installation

before you install this library you need to install other libraries

    npm install redux axios redux-promise-middleware --save

and then

    npm install reduxpp --save

## Usage

    ...
    import promiseMiddleware from 'redux-promise-middleware';
    import { wrapReducer, FetchArrayReducer } from "reduxpp";

    const reducers = combineReducers({
        ItemReducer : wrapReducer(new FetchArrayReducer("Items"))           //DEFINING NEW REDUCER
    })

    const middleware = applyMiddleware(promiseMiddleware);   //Don't forget to apply redux-promise-middleware

    const store = createStore(reducers , middleware);


    ...
    //some where to dispatch an action with http request
    import {GETAction} from "reduxpp"
    ...

    const type = "Items";
    const url = "...";
    const data = {offset : 50};
    const action = GETAction(action, url , data);
    dispatch(action);

## Documentation

### Reducer class

to initialize new instance of a `Reducer` you need to give its constructor three arguments

- initial state : of type `object`
- stateForAction : an array of type `StateForAction`
- defaultState(optional) : of type `StateForAction`

example : create open/close reducer

    import {Reducer} from "reduxpp"

    const openCloseReducer = new Reducer({openState : false} , [
        new StateForActionFromObject("Open" , null , {openState : true}),
        new StateForActionFromObject("Close" , null , {openState : false}),
    ]);

### StateForAction

before we go more farther , we need to know all about `StateForAction`.

typically in a reducer you have switch statement on the type of supplied action to the reducer , like this

    (state = {openState : false}, action) => {
        switch(action.type){
            case "Open" : return {openState : true};
            case "Close" : return {openState: false};
            case "SomeOtherAction" : return {openState : action.payload.openState};
            default : return {openState : false};
        }
    }
    //this that you typically have

that mean for each type of action you return a state , wether its direct state or from payload , so we provide two types of `StateForAction`

**the first one** is `StateForActionFromObject` , its constructor takes three arguments

- type : of type `string` , defining the type of action , for example `"Open"` action
- preHandler : we will get back to it later
- newState : of type `object` , the state that you want to override the old state with , for example `{openState: true}`


    new StateForActionFromObject("Open" , null , {openState : true});

this code will be like this in a typical reducer

    (state = {openState : false}, action) => {
        switch(action.type){
            case "Open" : return {...state , openState : true};
            ...
        }
    }

**the second one** is `StateForActionFromPayload` , when you need to extract the new state from the payload this class what you looking for , its constructor takes three arguments

- type : of type `string` , defining the type of action for example `"Open"` action
- preHandler : we will get back to it later
- newStateHandler : a callback that will receive `payload` and `currentState` and should return object

example

    new StateForActionFromObject("SomeAction" , null , (payload , currentState) => {
    return {openState : payload.openState};
    });

this code will be like this in typical reducer

    (state = {openState : false}, action) => {
        switch(action.type) {
            case "SomeAction" : return {...state , openState : action.payload.openState};
            ...
        }
    }

### PreHandle & PreHandleResult

`StateForAction` classes take preHandle callback that return `PreHandleResult` , the purpose of this callback is to do something before returning the newState , preHandle callback will receive three parameters

- payload : the payload of the action
- currentState : the current state of the reducer
- defaultState : the defaultState of the reducer

the callback should return `PreHandleResult` object , which contains only two properties

- result : of type `object`
- stopHandling : of type `boolean`

when the value of `stopHandling` is true , the new state will be extracted by overriding `result` property with old state

**if** you don't want this just put `null` instead of the callback


## Predefined Reducers

- **FetchArrayReducer** : when your api return json array this reducer will be what you looking for , its constructor takes four arguments

    * type : of type `string` , defining the type of the action
    * fulfilledStateHandler(optional) : a callback that you can define to change the default behavior to extract new state when the http request fulfilled with the response , it receive the current state , and the response of the request
    * keepStateOnLoad(optional) : of type `boolean` , indicate should the state remain when request begin sending
    * keepStateOnError(optional) : of type `boolean` , indicate should the state remain when request fails

    your state will be like this :

        {
            loading : `boolean`,
            error : `boolean`,
            array : `array` // your json response
        }


#
#
#

- **FetchObjectReducer** : when your api return json object this reducer will be what you looking for , its constructor takes four arguments

    * type : of type `string` , defining the type of the action
    * fulfilledStateHandler(optional) : a callback that you can define to change the default behavior to extract new state when the http request fulfilled with the response , it receive the current state , and the response of the request
    * keepStateOnLoad(optional) : of type `boolean` , indicate should the state remain when request begin sending
    * keepStateOnError(optional) : of type `boolean` , indicate should the state remain when request fails

    your state will be like this :

        {
            loading : `boolean`,
            error : `boolean`,
            object : `object` // your json response
        }

#
#
#
- **SuccessStateReducer** : when your api return json object that have `success` property and optional `message` property this reducer will be what you looking for , its constructor takes four arguments

    * type : of type `string` , defining the type of the action
    * keepStateOnLoad(optional) : of type `boolean` , indicate should the state remain when request begin sending
    * keepStateOnError(optional) : of type `boolean` , indicate should the state remain when request fails

    your state will be like this :

        {
            loading : `boolean`,
            error : `boolean`,
            success : `boolean` ,
            success : `boolean` ,
            message : `string`
        }

#
#
- **FetchInfiniteArrayReducer** : its like `FetchArrayReducer` but when the request fulfilled the array will be merged with previous array

    * type : of type `string` , defining the type of the action
    * keepStateOnLoad(optional) : of type `boolean` , indicate should the state remain when request begin sending
    * keepStateOnError(optional) : of type `boolean` , indicate should the state remain when request fails

    your state will be like this :

        {
            loading : `boolean`,
            error : `boolean`,
            array : `array` // your json response + previous array
        }

## Actions

- **GETAction** : function that will return action object to send http GET request , it takes four arguments

  - type : `string`
  - url : `string`
  - data : `object`
  - options : `AxiosRequestConfig` , to add some options to the request

- **POSTAction** : function that will return action object to send http POST request , it takes four arguments

  - type : `string`
  - url : `string`
  - data : `object`
  - options : `AxiosRequestConfig` , to add some options to the request

- **resetAction** : use this function to make action that reset the state of http reducer , it takes only one argument

  - type : `string`

* **addItemToStart** : function that make action to add item item at the start of array , it takes

  - type : `string`
  - item : `any`

* **addItemToLast** : function that make action to add item item at the end of array , it takes

  - type : `string`
  - item : `any`

* **addItemAtIndex** : function that make action to add item item at an index , it takes

  - type : `string`
  - index : `number`
  - item : `any`

* **removeItemAtIndex** : function that make action to remove item item at an index , it takes

  - type : `string`
  - index : `number`


#
#
#
#
#
#
## Configure The Store

**first** , you need to add `redux-promise-middleware` when you create your store

    import promiseMiddleware from 'redux-promise-middleware';
    const middleware = applyMiddleware(promiseMiddleware);


**second** , to define a reducer you need to use `wrapReducer` , like this


    import { wrapReducer, FetchArrayReducer } from "reduxpp";
    const reducers = combineReducers({
        ItemReducer : wrapReducer(new FetchArrayReducer("Items"))
    })

**then** , create your store

    const store = createStore(reducers , middleware);



## Examples

* **without react** , checkout `src/example.ts` file 

        git clone https://github.com/alicompiler/redux-pp.git
        cd redux-pp
        npm install 
        npm test
        npm start

* **with react** , checkout this [repo](https://github.com/alicompiler/reduxpp-react-example)