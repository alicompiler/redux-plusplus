import StateForActionFromObject from "./../core/StateForActionFromObject";
import Reducer from '../core/Reducer';
import IAction from '../core/IAction';
import StateForActionFromPayload from '../core/StateForActionFromPayload';
import PreHandleResult from '../core/PreHandleResult';

test("basic-reducer", () => {
    const type = "SOME_TYPE";
    const simpleStateForAction = new StateForActionFromObject(type, null, { value: "SOME_VALUE" });
    const reducer = new Reducer({ value: "" }, [simpleStateForAction]);
    const action: IAction = { type: type, payload: {} };
    const initialState = {};
    const newState = reducer.reduce(initialState, action);
    expect(newState).toEqual({ value: "SOME_VALUE" });
});


test("default-action", () => {
    const type = "SOME_TYPE";
    const simpleStateForAction = new StateForActionFromObject(type, null, { value: "SOME_VALUE" });
    const defaultState = new StateForActionFromObject("", null, { value: "DEFAULT_VALUE" });
    const reducer = new Reducer({ value: "" }, [simpleStateForAction], defaultState);
    const action: IAction = { type: "SOME_OTHER_TYPE", payload: {} };
    const initialState = {};
    const newState = reducer.reduce(initialState, action);
    expect(newState).toEqual({ value: "DEFAULT_VALUE" });
});


test("with-payload-handler", () => {
    const type = "SOME_TYPE";
    const handler = (payload: object) => {
        return { otherValue: "OTHER_VALUE", value: payload["value"] };
    };
    const simpleStateForAction = new StateForActionFromPayload(type, null, handler);
    const reducer = new Reducer({ value: "" }, [simpleStateForAction]);
    const action: IAction = { type: type, payload: { value: "VALUE_FROM_PAYLOAD" } };
    const newState = reducer.reduce({}, action);
    expect(newState).toEqual({ otherValue: "OTHER_VALUE", value: "VALUE_FROM_PAYLOAD" });
});


test("pre-handle-stop", () => {
    const type = "SOME_TYPE";
    const preHandler = (): PreHandleResult => {
        return {
            stopHandling: true,
            result: { value: "STOP-HANDLING" }
        };
    };
    const simpleStateForAction = new StateForActionFromObject(type, preHandler, { value: "SOME_VALUE" });
    const reducer = new Reducer({ value: "" }, [simpleStateForAction]);
    const action: IAction = { type: type, payload: {} };
    const initialState = {};
    const newState = reducer.reduce(initialState, action);
    expect(newState).toEqual({ value: "STOP-HANDLING" });
});


test("pre-handing-non-stop", () => {
    const type = "SOME_TYPE";
    const preHandler = (): PreHandleResult => {
        return {
            stopHandling: false,
            result: {}
        };
    };
    const simpleStateForAction = new StateForActionFromObject(type, preHandler, { value: "SOME_VALUE" });
    const reducer = new Reducer({ value: "" }, [simpleStateForAction]);
    const action: IAction = { type: type, payload: {} };
    const initialState = {};
    const newState = reducer.reduce(initialState, action);
    expect(newState).toEqual({ value: "SOME_VALUE" });
});


test("handleNoActionSupplied", () => {
    const type = "SOME_TYPE";
    const simpleStateForAction = new StateForActionFromObject(type, null, { value: "SOME_VALUE" });
    const reducer = new Reducer({ value: "" }, [simpleStateForAction]);
    const action: IAction = { type: "SOME_OTHER_TYPE", payload: {} };
    const initialState = { value: "NON_HANDLED_VALUE" };
    const newState = reducer.reduce(initialState, action);
    expect(newState).toEqual({ value: "NON_HANDLED_VALUE" });
});