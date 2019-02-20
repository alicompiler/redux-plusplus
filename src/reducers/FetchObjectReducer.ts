import HttpReducer from './HttpReducer';

export default class FetchObjectReducer extends HttpReducer {

    constructor(type: string,
        fulfilledStateHandler : null | ((currentState : object , payload : any) => object) = null,
        keepStateOnLoad: boolean = false, keepStateOnError: boolean = false) {
        super({ loading: false, error: false, object: null }, type,fulfilledStateHandler, keepStateOnLoad, keepStateOnError);
    }

    protected getExtractStateFromPayloadHandler(): ((payload: any) => any) {
        return payload => {
            if(this.fulfilledStateHandler) {
                const state = this.fulfilledStateHandler(this.currentState , payload);
                return {...state , loading : false , error : false};
            }
            return { object: payload.data , loading : false , error : false};
        }
    };

    protected getResetExtraState(): object {
        return { object: {} };
    };
}
