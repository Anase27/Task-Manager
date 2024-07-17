import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
    {
        path: '',
        component: TaskList,
        title: "Tasks home",
    },
    {
        path: 'history',
        component:HistoryComponent,
        title: "History Page",
    }
];
