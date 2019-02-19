import HttpReducer from './HttpReducer';
import StateForActionFromPayload from '../core/StateForActionFromPayload';

export default class FetchArrayReducer extends HttpReducer {
    static readonly REMOVE_ITEM_AT_INDEX_CASE = 'REMOVE_ITEM_AT_INDEX_CASE';
    static readonly ADD_ITEM_AT_START_CASE = 'ADD_ITEM_AT_START_CASE';
    static readonly ADD_ITEM_AT_LAST_CASE = 'ADD_ITEM_AT_LAST_CASE';
    static readonly ADD_ITEM_AT_INDEX = 'ADD_ITEM_AT_INDEX';

    constructor(type: string, keepStateOnLoad: boolean = false, keepStateOnError: boolean = false) {
        super({ loading: false, error: false, array: null }, type, keepStateOnLoad, keepStateOnError);
        this.addRemoveItemAtIndexCase();
        this.addItemAtStartCase();
        this.addItemAtLastCase();
        this.addItemAtIndexCase();
    }

    private addRemoveItemAtIndexCase() {
        const type = this.type + '_' + FetchArrayReducer.REMOVE_ITEM_AT_INDEX_CASE;
        this.stateForAction.push(new StateForActionFromPayload(type, null, this.removeItemAtIndex));
    }

    protected removeItemAtIndex = (index: any): any => {
        const array = this.currentState['array'];
        array.splice(index, 1);
        return { array: [...array] };
    };

    private addItemAtStartCase() {
        const type = this.type + '_' + FetchArrayReducer.ADD_ITEM_AT_START_CASE;
        this.stateForAction.push(new StateForActionFromPayload(type, null, this.addItemAtStart));
    }

    protected addItemAtStart = (item: any): any => {
        const array: any[] = this.currentState['array'];
        array.unshift(item);
        return { array: [...array] };
    };

    private addItemAtLastCase() {
        const type = this.type + '_' + FetchArrayReducer.ADD_ITEM_AT_LAST_CASE;
        this.stateForAction.push(new StateForActionFromPayload(type, null, this.addItemAtLast));
    }

    protected addItemAtLast = (item: any): any => {
        const array: any[] = this.currentState['array'];
        array.push(item);
        return { array: [...array] };
    };

    private addItemAtIndexCase() {
        const type = this.type + '_' + FetchArrayReducer.ADD_ITEM_AT_INDEX;
        this.stateForAction.push(new StateForActionFromPayload(type, null, this.addItemAtIndex));
    }

    protected addItemAtIndex = (option: { index: number; item: any }): any => {
        let array: any[] = this.currentState['array'];
        array.splice(option.index, 0, option.item);
        return { array: [...array] };
    };

    protected getResetExtraState = (): object => {
        return { array: [] };
    };

    protected getExtractStateFromPayload = (): ((payload: any) => any) => {
        return payload => ({ array: payload.data });
    };
}
