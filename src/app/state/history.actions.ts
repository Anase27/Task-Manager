import { createActionGroup,createAction,props } from "@ngrx/store";
import { History } from "../history-collection/history.model";

export const historyActions = createActionGroup({
    source: 'History',
    events: {
        'Add Log': props<{logs: History}>(),
    },
});

export const HistoryApiAction = createActionGroup({
    source: 'History API',
    events: {
        'Get History': props<{logs: Array<History>}>(),
    },
});