import IReducer from "./IReducer";
import IAction from './IAction';

export default class Reducer implements IReducer {
    public initialState: object;

    reduce(state: object, action: IAction): object {
        return {};
    }
}