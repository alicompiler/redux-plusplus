import FetchObjectReducer from '../reducers/FetchObjectReducer';
test("test-fetch-object" , () => {
    const type = "FETCH_YXZ";
    const fetchObjectReducer = new FetchObjectReducer(type);
    let state = {loading : true , error : null , object : null};
    const newState = fetchObjectReducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : {value : 1}}});
    expect(newState).toEqual({loading : false , error : false , object : {value : 1}});
});


test("test-fetch-then-reset" , () => {
    const type = "FETCH_YXZ";
    const reducer = new FetchObjectReducer(type);
    let state = {loading : false , error : true , object :  null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : {value : 1}}});
    expect(newState).toEqual({loading : false , error : false , object : {value : 1}});
    const newState2 = reducer.reduce(newState , {type : `${type}_RESET` , payload : {}});
    expect(newState2).toEqual({loading: false , error : false , object : {}});
});


test("test-fetch-object-with-fulfilled-handler" , () => {
    const type = "FETCH_YXZ";
    const fulfilledHandler = (state:object , payload:any)=>{
        if(state["object"] && Object.keys(state["object"]).length > 0){
            return {object : {...state["object"] , ...payload.data}};   
        }
        return {object : payload.data};
    };
    const reducer = new FetchObjectReducer(type , fulfilledHandler , true , true);
    let state = {loading : true , error : false , object : null};
    const newState = reducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : {value : 1}}});
    expect(newState).toEqual({loading : false , error : false , object : {value : 1}});
    const newState2 = reducer.reduce(newState , {type : `${type}_FULFILLED` , payload : {data : {value2 : 2}}});
    expect(newState2).toEqual({loading : false , error : false , object : {value : 1 , value2: 2}});
});

