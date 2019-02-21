import StateForAction from './StateForAction';
import PreHandleResult from './PreHandleResult';

export default class StateForActionFromPayload extends StateForAction {
    protected newStateHandler: (payload: object, currentState: object) => object;

    constructor(
        type: string,
        preHandle: ((payload: any, currentState: object, initialState: object) => PreHandleResult) | null,
        newStateHandler: (payload: object, currentState: object) => object
    ) {
        super(type, preHandle);
        this.newStateHandler = newStateHandler;
    }

    public extractNewState(payload: object, currentState: object = {}): object {
        const state = this.newStateHandler(payload, currentState);
        return { ...state };
    }
}
