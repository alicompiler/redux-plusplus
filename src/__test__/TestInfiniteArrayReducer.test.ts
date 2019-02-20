import FetchInfiniteArrayReducer from '../reducers/FetchInfiniteArrayReducer';
test("test-infinite-array-reducer" , () => {
    const type = "FETCH_XZY";
    const reducer = new FetchInfiniteArrayReducer(type);
    const startState = {loading : true , error : false , array : []};
    const newState = reducer.reduce(startState , {type : `${type}_FULFILLED` , payload : {data : [1,2,3]}});
    expect(newState).toEqual({loading : false , error :false , array : [1,2,3]});
    const newState2 = reducer.reduce(newState , {type : `${type}_FULFILLED` , payload : {data : [4,5]}});
    expect(newState2).toEqual({loading : false ,error : false , array : [1,2,3,4,5] , newCount : 2});
});