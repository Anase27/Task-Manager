import { createReducer, on } from "@ngrx/store";
import { historyActions } from "./history.actions";
import { HistoryApiAction } from "./history.actions";

import { History } from "../history-collection/history.model";


export const initialState:Array<History> = [];

export const historyReducer = createReducer(
    initialState,
    on(HistoryApiAction.getHistory,(_state,{logs}) => {
        localStorage.setItem('history',JSON.stringify(logs));
        return logs
    }),

    on(historyActions.addLog,(state,{logs})=>{

        const newHistory =[logs,...state]
        localStorage.setItem("history",JSON.stringify(newHistory));
        return newHistory;
    }),
);