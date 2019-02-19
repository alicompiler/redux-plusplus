import FetchObjectReducer from '../reducers/FetchObjectReducer';
test("test-fetch-object" , () => {
    const type = "FETCH_YXZ";
    const fetchObjectReducer = new FetchObjectReducer(type);
    let state = {loading : true , error : null , object : null};
    const newState = fetchObjectReducer.reduce(state , {type : `${type}_FULFILLED` , payload : {data : {value : 1}}});
    expect(newState).toEqual({loading : false , error : false , object : {value : 1}});
});

