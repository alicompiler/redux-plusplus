import StateForAction from './StateForAction';
import PreHandleResult from './PreHandleResult';
export default class StateForActionFromObject extends StateForAction {

    protected newState: object;

    constructor(type: string,
        preHandle: ((payload: any, currentState: object, initialState: object) => PreHandleResult) | null,
        newState: object) {
        super(type, preHandle)
        this.newState = newState;
    }

    public extractNewState(): object {
        return this.newState;
    }

}