import PreHandleResult from './PreHandleResult';
export default abstract class StateForAction {
    protected type: string;
    protected preHandle: null | ((payload: any, currentState: object, initialState: object) => PreHandleResult);

    constructor(type: string,
        preHandle: ((payload: any, currentState: object, initialState: object) => PreHandleResult) | null = null) {
        this.type = type;
        this.preHandle = preHandle;
    }

    public abstract extractNewState(payload: object): object;

}