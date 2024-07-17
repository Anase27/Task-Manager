import { createReducer,on } from "@ngrx/store";
import { Task } from "../task-list/task.model";
import { TasksApiAction } from "./task.actions";
import { taskActions } from "./task.actions";


export const initialState: Array<Task> = [];

export const taskReducer = createReducer(
    initialState,
    on(TasksApiAction.getTasks,(_state,{tasks})=>{
        localStorage.setItem('tasks',JSON.stringify(tasks));
        return tasks
    }),

    on(taskActions.removeTask,(state,{taskId}) =>{
        const newList = state.filter((task) => taskId !== task.id);
        localStorage.setItem('tasks',JSON.stringify(newList));
        return newList;
    }),
    on(taskActions.addTask,(state,{task}) =>{
        // task.duedate = task.duedate
        const newTaskList = [task,...state];
        console.log(newTaskList);
        console.log(JSON.stringify(newTaskList));
        localStorage.setItem('tasks',JSON.stringify(newTaskList));
        return [task,...state]
    }),
    on(taskActions.editTask,(state,{task}) =>{
        const newTaskList = state.map((t) => t.id === task.id ? task : t);
        localStorage.setItem('tasks', JSON.stringify(newTaskList));
        return newTaskList;
    })
);


// export const initialState:ReadonlyArray<String> = [];

// export const listReducer = createReducer(
//     initialState,
//     on(taskActions.removeTask,(state,{taskId}) =>
//         state.filter((id) => taskId !== id)
//     ),
//     on(taskActions.addTask,(state,{taskId}) =>{
//         if(state.indexOf(taskId)>-1) return state;

//         return [...state,taskId]
//     })
// );