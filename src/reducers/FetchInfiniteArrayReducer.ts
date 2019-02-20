import FetchArrayReducer from './FetchArrayReducer';

export default class FetchInfiniteArrayReducer extends FetchArrayReducer
{
    constructor(type: string, 
        keepStateOnLoad: boolean = false, keepStateOnError: boolean = false) {
            super(
                type , 
                (state: object, payload: any) => {
                    if (state["array"] && (state["array"] as any[]).length > 0) {
                        return { array: (state["array"] as any[]).concat(payload.data) , newCount : payload.data.length};
                    }
                    return { array: payload.data };
                } ,            
                keepStateOnLoad , keepStateOnError);          
    }
    
}