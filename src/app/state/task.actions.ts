import { createActionGroup,props } from "@ngrx/store";
import { Task } from "../task-list/task.model";

// export const taskActions = createActionGroup({
//     source: 'Tasks',
//     events: {
//         'Add Task': props<{taskId: String}>(),
//         'Remove Task': props<{taskId: String}>(),
//     },
// });

// export const TasksApiAction = createActionGroup({
//     source: 'Tasks API',
//     events: {
//         'Get Tasks': props<{tasks: ReadonlyArray<Task>}>(),
//     },
// });
export const taskActions = createActionGroup({
    source: 'Tasks',
    events: {
        'Add Task': props<{task: Task}>(),
        'Edit Task': props<{task: Task}>(),
        'Remove Task': props<{taskId: String}>(),
    },
});

export const TasksApiAction = createActionGroup({
    source: 'Tasks API',
    events: {
        'Get Tasks': props<{tasks: Array<Task>}>(),
    },
});