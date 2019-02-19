import IReducer from './IReducer';
import IAction from './IAction';
import StateForAction from './StateForAction';

export default class Reducer implements IReducer {
    public initialState: object;
    protected stateForAction: StateForAction[];
    protected defaultAction: StateForAction | null;
    protected currentState: object;

    constructor(initialState: object, stateForActrion: StateForAction[], defaultState: StateForAction | null = null) {
        this.initialState = initialState;
        this.stateForAction = stateForActrion;
        this.defaultAction = defaultState;
    }

    reduce = (state: object, action: IAction): object => {
        this.currentState = state;
        const newState = this.handleAction(state, action);
        if (newState) {
            return newState;
        } else if (this.defaultAction) {
            const extractedState = this.defaultAction.extractNewState(action.payload);
            return { ...state, ...extractedState };
        }

        return this.handleNoActionSupplied(state, action);
    };

    private handleAction = (state: object, action: IAction): object | null => {
        for (let stateForAction of this.stateForAction) {
            if (action.type === stateForAction.type) {
                if (stateForAction.preHandle) {
                    const result = stateForAction.preHandle(action.payload, this.currentState, this.initialState);
                    if (result.stopHandling === true) {
                        return { ...result.result };
                    }
                }
                const extractedState = stateForAction.extractNewState(action.payload);
                return { ...state, ...extractedState };
            }
        }
        return null;
    };

    protected handleNoActionSupplied = (state: object, action: IAction): object => {
        return state;
    };
}
