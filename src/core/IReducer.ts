import IAction from './IAction';

export default interface IReducer {
    initialState: object;
    reduce(state: object, action: IAction): object;
}
