import HttpReducer from '../reducers/HttpReducer';
import IAction from '../core/IAction';

test("test-load" , () => {
    const type = "SOME_ACTION";
    const httpReducer = new HttpReducer({} , type);
    const action : IAction = {type : type + "_" + "PENDING" , payload : {}};
    const newState = httpReducer.reduce({} , action);
    expect(newState).toEqual({loading : true , error : false});
});


test("test-error" , () => {
    const type = "SOME_ACTION";
    const httpReducer = new HttpReducer({} , type);
    const action : IAction = {type : type + "_" + "REJECTED" , payload : {}};
    const newState = httpReducer.reduce({loading : false , error : null} , action);
    expect(newState).toEqual({loading : false , error : true});
});


test("test-load-then-error" , () => {
    const type = "SOME_ACTION";
    const httpReducer = new HttpReducer({} , type);
    const action : IAction = {type : type + "_" + "PENDING" , payload : {}};
    const newState = httpReducer.reduce({loading : false , error : null} , action);
    expect(newState).toEqual({loading : true , error : false});
    const action2 : IAction = {type : type + "_" + "REJECTED" , payload : {}};
    const newState2 = httpReducer.reduce(newState , action2);
    expect(newState2).toEqual({loading : false , error: true});
});


test("test-reset" , () => {
    const type = "SOME_ACTION";
    const httpReducer = new HttpReducer({loading : false, error : null} , type);
    const action : IAction = {type : type + "_" + "PENDING" , payload : {}};
    const newState = httpReducer.reduce({loading : false, error : null} , action);
    expect(newState).toEqual({loading : true , error : false});
    const action2 : IAction = {type : type + "_" + "RESET" , payload : {}};
    const newState2 = httpReducer.reduce(newState , action2);
    expect(newState2).toEqual({loading : false , error: null});
});

