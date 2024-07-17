import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Task } from "../task-list/task.model";
import { History } from "../history-collection/history.model";

export const selectTasks = createFeatureSelector<Array<Task>>('tasks');
export const selectHistory = createFeatureSelector<Array<History>>('history');

// export const selectedTaskList = createSelector(
//     selectedTasks,
//     selectListState,
//     (tasks,list) => {
//         return list.map((id) => tasks.find((task) => task.id === id)!);
//     }
// );
export const taskList = createSelector(
    selectTasks,
    (tasks) => { tasks }
);


export const historyList = createSelector(
    selectHistory,
    (history) => { history }
);

export const decreasingPriority = createSelector(
    selectTasks,
    (tasks) => {
        return [...tasks].sort((a, b) => {
            const priorityOrder:{[key:string]:number} = { 'low': 1, 'medium': 2, 'high': 3 };
            return priorityOrder[b.priorityLevel] - priorityOrder[a.priorityLevel];
        });
    }
);
export const increasingPriority = createSelector(
    selectTasks,
    (tasks) => {
        return [...tasks].sort((a, b) => {
            const priorityOrder:{[key:string]:number} = { 'low': 1, 'medium': 2, 'high': 3 };
            return priorityOrder[a.priorityLevel] - priorityOrder[b.priorityLevel];
        });
    }
);

export const pendingTaskFirst = createSelector(
    selectTasks,
    (tasks) => {
        return [...tasks].sort((a, b) => {
            const statusOrder:{[key:string]:number} = {'pending':1,'completed':2};
            return statusOrder[a.status] - statusOrder[b.status];
        });
    }
)
export const completedTaskFirst = createSelector(
    selectTasks,
    (tasks) => {
        return [...tasks].sort((a, b) => {
            const statusOrder:{[key:string]:number} = {'pending':1,'completed':2};
            return statusOrder[b.status] - statusOrder[a.status];
        });
    }
);
export const earliestDueDate = createSelector(
    selectTasks,
    (tasks) => {
      return [...tasks].sort((a, b) => {
        
        const datePartsA = a.duedate.split(",")[0].split("/");
        const datePartsB = b.duedate.split(",")[0].split("/");
        
        const dateA = new Date(`${datePartsA[2]}-${datePartsA[1]}-${datePartsA[0]}`);
        const dateB = new Date(`${datePartsB[2]}-${datePartsB[1]}-${datePartsB[0]}`);
        
        return dateA.getTime() - dateB.getTime();
      });
    }
);
export const farthestDueDate = createSelector(
    selectTasks,
    (tasks) => {
      return [...tasks].sort((a, b) => {
        
        const datePartsA = a.duedate.split(",")[0].split("/");
        const datePartsB = b.duedate.split(",")[0].split("/");
        
        const dateA = new Date(`${datePartsA[2]}-${datePartsA[1]}-${datePartsA[0]}`);
        const dateB = new Date(`${datePartsB[2]}-${datePartsB[1]}-${datePartsB[0]}`);
        
        return dateB.getTime() - dateA.getTime();
      });
    }
);