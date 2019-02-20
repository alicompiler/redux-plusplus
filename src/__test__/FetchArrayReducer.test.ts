import FetchArrayReducer from '../reducers/FetchArrayReducer';
test("test-fetch-array" , () => {
    const type = "FETCH_YXZ";
    const fetchObjectReducer = new FetchArrayReducer(type);
    let state = {loading : true , error : null , array : null};
    const newState = fetchObjectReducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1]}});
    expect(newState).toEqual({loading : false , error : false , array : [1]});
});

test("test-fetch-then-reset" , () => {
    const type = "FETCH_YXZ";
    const reducer = new FetchArrayReducer(type);
    let state = {loading : false , error : true , array :  null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1]}});
    expect(newState).toEqual({loading : false , error : false , array : [1]});
    const newState2 = reducer.reduce(newState , {type : `${type}_RESET` , payload : {}});
    expect(newState2).toEqual({loading: false , error : false , array : null});
});

test("test-fetch-then-reset-with-payload-null" , () => {
    const type = "FETCH_YXZ";
    const reducer = new FetchArrayReducer(type);
    let state = {loading : false , error : true , array :  null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1]}});
    expect(newState).toEqual({loading : false , error : false , array : [1]});
    const newState2 = reducer.reduce(newState , {type : `${type}_RESET` , payload : null});
    expect(newState2).toEqual({loading: false , error : false , array : null});
});


test("test-fetch-array-with-fulfilled-handler" , () => {
    const type = "FETCH_YXZ";
    const fulfilledHandler = (state:object , payload:any)=>{
        if(state["array"] && (state["array"] as any[]).length > 0){
            return {array : (state["array"] as any[]).concat(payload.data)};   
        }
        return {array : payload.data};
    };
    const reducer = new FetchArrayReducer(type , fulfilledHandler);
    let state = {loading : true , error : false , array : null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1]}});
    expect(newState).toEqual({loading : false , error : false , array : [1]});
    const newState2 = reducer.reduce(newState , {type : `${type}_FULFILLED` , payload : {data : [2]}});
    expect(newState2).toEqual({loading : false , error : false , array : [1,2]});
});


test("test-remove-item-at-index" , () => {
    const type = "FETCH_YXZ";
    const reducer = new FetchArrayReducer(type );
    let state = {loading : true , error : false , array : null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1,2,3,4,5]}});
    expect(newState).toEqual({loading : false , error : false , array : [1,2,3,4,5]});
    const newState2 = reducer.reduce(newState , {type : `${type}_REMOVE_ITEM_AT_INDEX` , payload : 2});
    expect(newState2).toEqual({loading : false , error : false , array : [1,2,4,5]});
});

test("test-add-item-at-index" , () => {
    const type = "FETCH_YXZ";
    const reducer = new FetchArrayReducer(type);
    let state = {loading : true , error : false , array : null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1,2,3,4,5]}});
    expect(newState).toEqual({loading : false , error : false , array : [1,2,3,4,5]});
    const newState2 = reducer.reduce(newState , {type : `${type}_ADD_ITEM_AT_INDEX` , payload : {index : 1 , item : 0}});
    expect(newState2).toEqual({loading : false , error : false , array : [1,0,2,3,4,5]});
});


test("test-add-item-at-last" , () => {
    const type = "FETCH_YXZ";
    const reducer = new FetchArrayReducer(type);
    let state = {loading : true , error : false , array : null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1,2,3,4,5]}});
    expect(newState).toEqual({loading : false , error : false , array : [1,2,3,4,5]});
    const newState2 = reducer.reduce(newState , {type : `${type}_ADD_ITEM_AT_LAST` , payload : 0});
    expect(newState2).toEqual({loading : false , error : false , array : [1,2,3,4,5 , 0]});
});


test("test-add-item-at-start" , () => {
    const type = "FETCH_YXZ";
    const reducer = new FetchArrayReducer(type);
    let state = {loading : true , error : false , array : null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1,2,3,4,5]}});
    expect(newState).toEqual({loading : false , error : false , array : [1,2,3,4,5]});
    const newState2 = reducer.reduce(newState , {type : `${type}_ADD_ITEM_AT_START` , payload : 0});
    expect(newState2).toEqual({loading : false , error : false , array : [0 , 1,2,3,4,5 ]});
});