import StateForAction from './StateForAction';
import PreHandleResult from './PreHandleResult';

export default class StateForActionFromPayload extends StateForAction {
    protected newStateHandler: (payload: object) => object;

    constructor(
        type: string,
        preHandle: ((payload: any, currentState: object, initialState: object) => PreHandleResult) | null,
        newStateHandler: (payload: object) => object
    ) {
        super(type, preHandle);
        this.newStateHandler = newStateHandler;
    }

    public extractNewState(payload: object): object {
        const state = this.newStateHandler(payload);
        return { ...state };
    }
}
