import HttpReducer from './HttpReducer';

export default class FetchObjectReducer extends HttpReducer {
    constructor(type: string, keepStateOnLoad: boolean = false, keepStateOnError: boolean = false) {
        super({ loading: false, error: false, object: null }, type, keepStateOnLoad, keepStateOnError);
    }

    protected getExtractStateFromPayload = (): ((payload: any) => any) => {
        return payload => ({ object: payload.data });
    };

    protected getResetExtraState = (): object => {
        return { object: {} };
    };
}
