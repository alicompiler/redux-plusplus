import StateForActionFromObject from './../core/StateForActionFromObject';
import StateForActionFromPayload from '../core/StateForActionFromPayload';
test("test-StateForActionFromObject", () => {
    const newState = { state: 1 };
    const stateForAction = new StateForActionFromObject("TYPE", null, newState);
    const extractedState = stateForAction.extractNewState();
    expect(extractedState).toEqual(newState);
});

test("test-StateForActionFromPayload", () => {
    const handler = (payload: any): object => {
        const newState = { value: payload.value + 1 };
        return newState;
    };
    const payload = { value: 1 };
    const stateForAction = new StateForActionFromPayload("TYPE", null, handler);
    const extractedState = stateForAction.extractNewState(payload);
    expect(extractedState).toEqual({ value: 2 });
})