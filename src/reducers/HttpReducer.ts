import Reducer from '../core/Reducer';
import StateForActionFromObject from '../core/StateForActionFromObject';
import StateForActionFromPayload from '../core/StateForActionFromPayload';

export default class HttpReducer extends Reducer {
    static readonly PENDING: string = 'PENDING';
    static readonly FULFILLED: string = 'FULFILLED';
    static readonly REJECTED: string = 'REJECTED';
    static readonly RESET: string = 'RESET';

    protected type: string;
    protected fulfilledStateHandler : null | ((currentState : object , payload : any) => object);
    protected keepStateOnLoad: boolean;
    protected keepStateOnError: boolean;

    constructor(
        initialState: object,
        type: string,
        fulfilledStateHandler : null | ((currentState : object , payload : any) => object) = null,
        keepStateOnLoad: boolean = false,
        keepStateOnError: boolean = false
    ) {
        super(initialState, []);
        this.type = type;
        this.fulfilledStateHandler = fulfilledStateHandler;
        this.keepStateOnLoad = keepStateOnLoad;
        this.keepStateOnError = keepStateOnError;

        this.addPendingCase();
        this.addFulfilledCase();
        this.addRejectedCase();
        this.addResetCase();
    }

    protected addPendingCase() {
        let actionType = this.type + '_' + HttpReducer.PENDING;
        this.stateForAction.push(new StateForActionFromObject(actionType, null, this.getPendingState()));
    };

    protected addFulfilledCase() {
        let actionType = this.type + '_' + HttpReducer.FULFILLED;
        let handler = this.getExtractStateFromPayloadHandler();
        this.stateForAction.push(new StateForActionFromPayload(actionType, null, handler));
    };

    protected getExtractStateFromPayloadHandler(): (payload: any) => object {
        return payload => payload.data;
    }

    protected addRejectedCase() {
        let actionType = this.type + '_' + HttpReducer.REJECTED;
        this.stateForAction.push(new StateForActionFromObject(actionType, null, this.getRejectedState()));
    };

    protected addResetCase() {
        const actionType = this.type + '_' + HttpReducer.RESET;
        const resetState = {
            ...this.initialState,
            ...this.getResetExtraState()
        };
        this.stateForAction.push(new StateForActionFromObject(actionType, null, resetState));
    };

    protected getResetExtraState(): object {
        return {};
    };

    protected getPendingState(): object {
        if (this.keepStateOnLoad) return { ...this.currentState, loading: true, error: null };
        return { loading: true, error: null };
    };

    protected getRejectedState(): object {
        if (this.keepStateOnError) return { ...this.currentState, loading: false, error: true };
        return { loading: false, error: true };
    };

    protected getFulfilledState(): object {
        return { loading: false, error: null };
    };
}
