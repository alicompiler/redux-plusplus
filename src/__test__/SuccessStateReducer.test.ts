import SuccessStateReducer from '../reducers/SuccessStateReducer';

test("test-success-state-reducer" , () => {
    const type = "FETCH_YXZ";
    const reducer = new SuccessStateReducer(type);
    const startState = {loading : true , error: false };
    const newState = reducer.reduce(startState , {type : `${type}_FULFILLED` , payload : {data : {success : true , message : "message"}}});
    expect(newState).toEqual({loading : false , error : false , success : true , message : "message"});
});

test("test-success-state-reducer-reset" , () => {
    const type = "FETCH_YXZ";
    const reducer = new SuccessStateReducer(type , true ,true);
    const startState = {loading : true , error: false };
    const newState = reducer.reduce(startState , {type : `${type}_FULFILLED` , payload : {data : {success : true , message : "message"}}});
    expect(newState).toEqual({loading : false , error : false , success : true , message : "message"});
    const newState2 = reducer.reduce(newState , {type : `${type}_RESET` , payload :{}});
    expect(newState2).toEqual({loading : false , error : false , success : null , message : null});
});