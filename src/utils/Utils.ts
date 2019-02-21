import IReducer from '../core/IReducer';
export function wrapReducer(reducer: IReducer) {
    return (state: any = reducer.initialState, action: any) => reducer.reduce(state, action);
}
