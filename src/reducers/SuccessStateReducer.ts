import HttpReducer from './HttpReducer';
export default class SuccessStateReducer extends HttpReducer {
    constructor(type: string,
        keepStateOnLoad: boolean = false, keepStateOnError: boolean = false) {
        super({ loading: false, error: false, success: null }, type , null, keepStateOnLoad, keepStateOnError);
    }

    protected getExtractStateFromPayloadHandler(): ((payload: any) => any) {
        return payload => {
            return { success: payload.data.success , message : payload.data.message , loading : false , error : false};
        }
    };

    protected getExtractResetStateFromPayloadHandler(): (payload: any) => object {
        return (payload: any) => {
            const newState = payload && (typeof payload === "object") ? payload : {};
            return { ...this.initialState, error: false, loading: false, success: null , message : null, ...newState };
        };
    }
}