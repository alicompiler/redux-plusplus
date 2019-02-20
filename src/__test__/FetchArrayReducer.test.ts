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
    expect(newState2).toEqual({loading: false , error : false , array : []});
});


test("test-fetch-object-with-fulfilled-handler" , () => {
    const type = "FETCH_YXZ";
    const fulfilledHandler = (state:object , payload:any)=>{
        if(state["array"] && (state["array"] as any[]).length > 0){
            return {array : (state["array"] as any[]).concat(payload.data)};   
        }
        return {array : payload.data};
    };
    const reducer = new FetchArrayReducer(type , fulfilledHandler , true , true);
    let state = {loading : true , error : false , array : null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : [1]}});
    expect(newState).toEqual({loading : false , error : false , array : [1]});
    const newState2 = reducer.reduce(newState , {type : `${type}_FULFILLED` , payload : {data : [2]}});
    expect(newState2).toEqual({loading : false , error : false , array : [1,2]});
});


