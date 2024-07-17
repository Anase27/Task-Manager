import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { completedTaskFirst, decreasingPriority, earliestDueDate, farthestDueDate, increasingPriority, pendingTaskFirst, selectHistory, selectTasks } from './state/tasks.selector';
import { Store } from '@ngrx/store';
import { TasksService } from './task-list/tasks.service';
import { taskActions, TasksApiAction } from './state/task.actions';
import { TaskList } from './task-list/task-list.component';
import { TaskCollectionComponent } from './history-collection/history-collection.component';
import { CommonModule } from '@angular/common';
import { TaskFormDialog, TaskAddButton } from './task-form-dialog/task-form-dialog.component';
import { Task } from './task-list/task.model';
import { History } from './history-collection/history.model';
import { historyActions, HistoryApiAction } from './state/history.actions';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatButtonModule, MatMenuModule, TaskList, TaskCollectionComponent, CommonModule, TaskAddButton],
  templateUrl:'./app.component.html',
//   template:`
//     <!-- <app-task-add-button></app-task-add-button> -->
//     <div>
//     <div class="nav-element">
//         <!-- <p><b>Task Manager</b></p> -->
//         <h2>Task Manager</h2>
//         <app-task-add-button></app-task-add-button>
//     </div>

//     <h2>Tasks</h2>
//     <app-task-list class="task-list" [tasks]="(tasks$ | async)!" (removeTask)="onRemoveTask($event)"></app-task-list>
    
// </div>
//   `,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'TaskManager';

  tasks$;
  historyList$;
  

  constructor(private tasksService:TasksService,private store:Store) {
    this.tasks$ = this.store.select(selectTasks);
    this.historyList$ = this.store.select(selectHistory);
  }
  
  ngOnInit() {
    this.tasksService
    .getTasks()
    .subscribe((tasks)=>this.store.dispatch(TasksApiAction.getTasks({tasks})));
    this.tasksService.getHistory().subscribe((logs)=>this.store.dispatch(HistoryApiAction.getHistory({logs})))
  }
}
