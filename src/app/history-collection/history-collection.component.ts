import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Task } from '../task-list/task.model';
import { CommonModule } from '@angular/common';
import { History } from './history.model';

@Component({
  selector: 'app-task-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-collection.component.html',
  styleUrls: ['./history-collection.component.css'],
})
export class TaskCollectionComponent {
  @Input() historyList: ReadonlyArray<History> = [];
  @Output() remove = new EventEmitter<string>();
}