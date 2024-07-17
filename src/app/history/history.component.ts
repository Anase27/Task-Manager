import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { History } from '../history-collection/history.model';
import { selectHistory } from '../state/tasks.selector';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  history$;

  constructor(private store:Store) {
    this.history$ = this.store.select(selectHistory);
    // this.historyList$ = this.store.select(selectHistory);
  }
}
